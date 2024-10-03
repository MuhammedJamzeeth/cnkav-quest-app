import logging
import os
from typing import List
import stripe

from authlib.integrations.starlette_client import OAuth
from bson import ObjectId
from dotenv import load_dotenv
from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from starlette import status
from starlette.config import Config
from starlette.responses import JSONResponse

from app.db.database import user_collection
from app.models.user import UserModel, UpdateDetails
from app.schema.user_schema import GoogleUser, CreateUserRequest, CreateUserResponse, UserInDB, UserResponse, \
    UserDetails

stripe.api_key = os.getenv('STRIPE_API_KEY')

load_dotenv()

logger = logging.getLogger(__name__)

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# OAuth2 password bearer for token-based authentication
oauth_bearer = OAuth2PasswordBearer(tokenUrl="auth/token")

# Fetch Google OAuth client credentials from environment variables
GOOGLE_CLIENT_ID = os.environ.get('GOOGLE_CLIENT_ID', None)
GOOGLE_CLIENT_SECRET = os.environ.get('GOOGLE_CLIENT_SECRET', None)
DEFAULT_ROLE = "free-tier-user"

# if GOOGLE_CLIENT_ID is None or GOOGLE_CLIENT_SECRET is None:
#    raise Exception('Missing env variables')

# Configure OAuth with Google
config_data = {'GOOGLE_CLIENT_ID': GOOGLE_CLIENT_ID, 'GOOGLE_CLIENT_SECRET': GOOGLE_CLIENT_SECRET}
starlette_config = Config(environ=config_data)
oauth = OAuth(starlette_config)

oauth.register(
    name='google',
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={'scope': 'openid email profile'},
)


async def create_user(user_data: CreateUserRequest):
    """
    Creates a new user with the provided data, initiates Stripe account onboarding, 
    and creates both Stripe customer and account IDs.
    """
    try:
        # Check if user already exists
        existing_user = await user_collection.find_one({"email": user_data.email})
        if existing_user:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                                detail="User with this email already exists")

        # Hash the user password
        user_data.hash_password()

        customer = stripe.Customer.create(
            email=user_data.email,
        )

        account = stripe.Account.create(
            type="express",
            email=user_data.email,
            capabilities={
                "transfers": {"requested": True},
                "card_payments": {"requested": True}
            }
        )

        # Step 3: Prepare user data for insertion into the database, including both Stripe IDs
        user_data_dict = {
            "name": user_data.name,
            "email": user_data.email,
            "hashed_password": user_data.password,
            "role": DEFAULT_ROLE,
            "customer_id": customer.id,
            "connected_account_id": account.id
        }

        # Insert the user into the database
        result = await user_collection.insert_one(user_data_dict)
        inserted_user = await user_collection.find_one({"_id": result.inserted_id})

        # Debug: Print inserted user data
        print("Inserted User Data:", inserted_user)

        # Step 4: Create Stripe account onboarding link (optional, if you need account onboarding)
        account_link = stripe.AccountLink.create(
            account=account.id,
            refresh_url="https://backend.cnkav.com/",
            return_url="https://backend.cnkav.com/",
            type="account_onboarding",
        )

        # Step 5: Return the response with the newly created user data
        return CreateUserResponse(**inserted_user)

    except stripe.error.StripeError as e:
        logger.error(f"Stripe error during account creation: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Stripe error occurred while creating the user account"
        )
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error(f"Error creating user: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while creating the user"
        )


async def create_user_from_google_info(google_user: GoogleUser):
    """
      Creates a user from Google OAuth information or returns the existing user.

      Args:
          google_user (GoogleUser): Information from Google OAuth.

      Returns:
          UserModel: The created or existing user.
    """
    existing_user = await user_collection.find_one({"email": google_user.email})

    if existing_user:
        return UserModel(**existing_user)

    new_user_data = UserModel(
        fullname=google_user.name,
        email=google_user.email,
        password="default_password"
    )
    new_user = await user_collection.insert_one(new_user_data.dict(by_alias=True))
    inserted_user = await user_collection.find_one({"_id": new_user.inserted_id})
    return UserModel(**inserted_user)


async def get_by_email(email: str):
    """
       Retrieves a user by email.

       Args:
           email (str): The email of the user.

       Returns:
           UserInDB: The user data if found; otherwise, None.

       Raises:
        HTTPException: If there are errors during database operations.
    """
    try:
        user = await user_collection.find_one({"email": email})
        print("this is user found from email")
        print(user)
        if user:
            user["id"] = str(user.pop("_id"))
            return UserInDB(**user)
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User Not Found")
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error(f"Error retrieving user by email: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail="An error occurred while retrieving user")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
        Verifies a plain password against a hashed password.

        Args:
            plain_password (str): The plain password.
            hashed_password (str): The hashed password.

        Returns:
            bool: True if the password matches, False otherwise.

    """
    return bcrypt_context.verify(plain_password, hashed_password)


async def authenticate_user(username: str, password: str) -> UserInDB:
    """
      Authenticates a user by their email and password.

      Args:
          username (str): The user's email.
          password (str): The user's password.

      Returns:
          UserInDB: The authenticated user.

      Raises:
          HTTPException: If the email is incorrect or the password is incorrect.
      """
    user = await get_by_email(username)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect email",
                            )
    if not verify_password(password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect password",
                            )
    return user


async def get_all() -> List[UserResponse]:
    try:
        users = await user_collection.find().to_list(length=None)
        if not users:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Users not found")
        user_responses = [UserResponse(name=user.get('name'), email=user.get('email')) for user in users]
        return user_responses
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error(f"Error retrieving users: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail="An error occurred while retrieving users")


async def get_user_details_by_email(email: str):
    """
       Retrieves a user by email.

       Args:
           email (str): The email of the user.

       Returns:
           UserInDB: The user data if found; otherwise, None.

       Raises:
        HTTPException: If there are errors during database operations.
    """
    try:
        user = await user_collection.find_one({"_id": ObjectId(email)})

        if user:
            user["id"] = str(user.pop("_id"))
            
            return UserDetails(**user)
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User Not Found")
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error(f"Error retrieving user by email: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail="An error occurred while retrieving user")


async def update_account_details(email: str, update_details: UpdateDetails):
    try:

        # Initialize dictionary to hold update fields
        user_data_dict = {
            "first_name": update_details.first_name,
            "last_name": update_details.last_name,
            "email": update_details.email,
            "image": update_details.image
        }

        # If a new password is provided, hash and add it to the dictionary
        if update_details.new_password:
            update_details.hash_password()
            user_data_dict["hashed_password"] = update_details.new_password

        result = await user_collection.update_one({"_id": ObjectId(email)}, {"$set": user_data_dict})

        if result.modified_count == 1:
            # Retrieve the updated user details
            user = await user_collection.find_one({"_id": ObjectId(email)},
                                                  {"hashed_password": 0})  # Exclude password from returned data
            if user:
                user["_id"] = str(user["_id"])
                # Create response data structure
                data = {
                    "id": user["_id"],
                    "name": user["name"],
                    "sub": user["email"],
                    "role": user.get("role"),
                    "image": user.get("image"),
                    "customer_id": user.get("customer_id"),
                    "connected_account_id": user.get("connected_account_id")
                }

                return JSONResponse(content={"message": "Successfully user details updated", "user": data},
                                    status_code=status.HTTP_200_OK)

        raise HTTPException(status_code=status.HTTP_304_NOT_MODIFIED,
                            detail="An error occurred while update users details")
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error(f"Error retrieving users: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail="An error occurred while retrieving users")
