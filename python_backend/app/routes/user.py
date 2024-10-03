import logging
import os
import shutil
from pathlib import Path
from typing import List, Optional
from pydantic import BaseModel
from authlib.integrations.base_client import OAuthError
from authlib.oauth2.rfc6749 import OAuth2Token
from fastapi import APIRouter, HTTPException, Request, UploadFile, File, Depends
from passlib.context import CryptContext
from starlette import status
from starlette.responses import JSONResponse
from app.utils.jwt import user_dependency, get_current_user
from app.db.database import affiliate_links_collection, sales_collection, user_collection
from app.schema.affiliate_schema import salesSchema
from datetime import datetime

from app.models.user import UpdateDetails

from app.schema.user_schema import GoogleUser, CreateUserRequest, CreateUserResponse, UserResponse
from app.service.user_service import create_user_from_google_info, create_user, get_all, get_by_email, \
    update_account_details, get_user_details_by_email
from app.service.user_service import oauth
import stripe


class AddPaymentMethodRequest(BaseModel):
    payment_method_id: str


class SubscribeRequest(BaseModel):
    name: str
    email: str
    price_id: str
    payment_method_id: str  
    affiliate_link: Optional[str] = None  
    amount:Optional[int] = None

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix='/user',
    tags=['User Management']
)

# Load Google OAuth credentials from environment variables
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
GOOGLE_REDIRECT_URI = "https://backend.cnkav.com/auth/callback/google"

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

UPLOAD_DIR = Path("uploads/profile_images")

# Create the upload directory if it doesn't exist
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
stripe.api_key = os.getenv('STRIPE_API_KEY')


class ChangePlanRequest(BaseModel):
    new_price_id: str
    payment_method_id: str

@router.get("/google")
async def login_google(request: Request):
    """
      Redirect user to Google's OAuth 2.0 authorization endpoint.
      This initiates the login process with Google.
    """
    return await oauth.google.authorize_redirect(request, GOOGLE_REDIRECT_URI)


@router.get("/callback/google")
async def auth_google(request: Request):
    """
       Handle the callback from Google after the user has authenticated.
       Exchange the authorization code for an access token and user info.
    """
    try:
        user_response: OAuth2Token = await oauth.google.authorize_access_token(request)
    except OAuthError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials")

    user_info = user_response.get("userinfo")
    logger.info(f"Google user info: {user_info}")
    google_user = GoogleUser(**user_info)
    await create_user_from_google_info(google_user)


@router.post("/create", response_description="Add new user", response_model=CreateUserResponse,
             response_model_by_alias=False,
             status_code=status.HTTP_201_CREATED,
             summary="Create a new user",
             description="Create a new user with fullname, email, and password")
async def add_user(create_user_request: CreateUserRequest):
    """
        Create a new user with the provided details.
    """
    result = await create_user(create_user_request)
    return result


@router.get("", response_description="Get all users", response_model=List[UserResponse], status_code=status.HTTP_200_OK)
async def get_all_users():
    return await get_all()


@router.get("/{email}", response_description="Get user by email", status_code=status.HTTP_200_OK)
async def get_user_details(email: str):
    return await get_user_details_by_email(email)


@router.put("/{email}", status_code=status.HTTP_200_OK)
async def update_user_details(email: str, update_details: UpdateDetails):
    return await update_account_details(email, update_details)


@router.post('/upload-profile-image', status_code=status.HTTP_201_CREATED)
async def upload_image(file: UploadFile = File(...)):
    if file.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Invalid file type. Only JPEG and PNG files are allowed.")

    file_path = UPLOAD_DIR / file.filename
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return JSONResponse(content={"image_url": f"/uploads/profile_images/{file.filename}"},
                        status_code=status.HTTP_201_CREATED)


@router.post("/withdraw")
async def withdraw_funds(amount: int, current_user: user_dependency):
    print("this is current user ")
    print(current_user)
    """
    Withdraw funds from the user's Stripe connected account to their bank account or card.
    """
    try:

        if not current_user.get('customer_id'):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                                detail="User does not have a connected account")

        transfer = stripe.Transfer.create(
            amount=amount,
            currency='usd',
            destination=current_user.get('customer_id'),
            description='Withdrawal of funds'
        )

        return {"status": "success", "transfer_id": transfer.id}

    except stripe.error.StripeError as e:
        logger.error(f"Stripe error during withdrawal: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Stripe error occurred while processing the withdrawal"
        )
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error(f"Error during withdrawal: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while processing the withdrawal"
        )


@router.get("/list/subscriptions")
async def list_subscriptions():
    """
    Fetch all available subscriptions (products and their associated prices) from Stripe.
    """
    try:
        # Fetch active products (subscriptions)
        products = stripe.Product.list(active=True)
        print("These are subscription options:")
        print(products)

        subscriptions = []

        for product in products.data:  # Make sure to use 'data' from the API response
            prices = stripe.Price.list(product=product.id)
            subscription_data = {
                "product_id": product.id,
                "name": product.name,
                "description": product.description,
                "prices": [
                    {
                        "id": price.id,
                        "unit_amount": price.unit_amount,
                        "currency": price.currency
                    } for price in prices.data
                ]
            }
            subscriptions.append(subscription_data)

        return {"subscriptions": subscriptions}

    except stripe.error.StripeError as e:
        logger.error(f"Stripe error while fetching subscriptions: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Stripe error occurred: {str(e)}"
        )
    except Exception as e:
        logger.error(f"Error while fetching subscriptions: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while fetching subscriptions"
        )

@router.post("/action/subscribe")
async def subscribe_to_plan(request: SubscribeRequest, current_user: dict = Depends(get_current_user)):
    try:
        logger.info(f"Subscription request received for user: {current_user['email']}")

        # Ensure the user has a Stripe customer ID or create one if necessary
        if not current_user.get('stripe_customer_id'):
            try:
                customer = stripe.Customer.create(
                    email=current_user['email'],
                    name=request.name,
                    metadata={"email": request.email}
                )
                current_user['stripe_customer_id'] = customer.id
                logger.info(f"Created new Stripe customer for user: {current_user['email']}")
            except stripe.error.StripeError as e:
                logger.error(f"Failed to create Stripe customer: {str(e)}")
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Failed to create Stripe customer"
                )

        # Check if the price ID is valid
        try:
            price = stripe.Price.retrieve(request.price_id)
        except stripe.error.StripeError as e:
            logger.error(f"Invalid price ID: {request.price_id}. Error: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid price ID"
            )

        # Create the subscription
        try:
            subscription = stripe.Subscription.create(
                customer=current_user['stripe_customer_id'],
                items=[{'price': request.price_id}],
                payment_behavior='default_incomplete',
                expand=['latest_invoice.payment_intent'],
            )
            
            logger.info(f"Subscription created for user {current_user['email']}: {subscription.id}")

            if subscription.status == 'incomplete':
                # Subscription requires further action (e.g., 3D Secure authentication)
                logger.info(f"Subscription {subscription.id} requires further action")
                return {
                    "status": "requires_action",
                    "payment_url": subscription.latest_invoice.hosted_invoice_url
                }
            elif subscription.status == 'active':
                # Subscription was created and paid successfully
                logger.info(f"Subscription {subscription.id} is active")
                return {
                    "status": "success",
                    "subscription_id": subscription.id
                }
            else:
                # Unexpected status
                logger.warning(f"Unexpected subscription status: {subscription.status}")
                return {
                    "status": "pending",
                    "subscription_id": subscription.id
                }

        except stripe.error.CardError as e:
            # Since it's a decline, stripe.error.CardError will be caught
            logger.error(f"Card declined: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Card declined: {e.user_message}"
            )
        except stripe.error.StripeError as e:
            logger.error(f"Stripe error during subscription creation: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="An error occurred while creating the subscription"
            )

    except Exception as e:
        logger.error(f"Unexpected error during subscription: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred"
        )

    try:
        # Ensure the user has a Stripe customer ID or create one if necessary
        if not current_user.get('customer_id'):
            logger.info(f"Creating a new Stripe customer for user: {current_user['email']}")
            try:
                # Create a new customer if it doesn't exist
                customer = stripe.Customer.create(
                    email=current_user['email'],
                    payment_method=request.payment_method_id,
                )
                current_user['customer_id'] = customer.id
            except stripe.error.StripeError as e:
                logger.error(f"Failed to create Stripe customer: {str(e)}")
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Failed to create Stripe customer"
                )

        # Log the payment method and customer ID
        logger.info(f"Payment method ID received: {request.payment_method_id}")
        logger.info(f"Customer ID: {current_user['customer_id']}")

        # Verify the payment method is valid
        try:
            payment_method = stripe.PaymentMethod.retrieve(request.payment_method_id)
        except stripe.error.InvalidRequestError:
            logger.error(f"Invalid payment method ID: {request.payment_method_id}")
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid payment method ID")

        # Attach the payment method to the customer
        try:
            stripe.PaymentMethod.attach(
                request.payment_method_id,
                customer=current_user['customer_id'],
            )
        except stripe.error.StripeError as e:
            logger.error(f"Error attaching payment method to customer: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error attaching payment method"
            )

        # Set default payment method
        try:
            stripe.Customer.modify(
                current_user['customer_id'],
                invoice_settings={'default_payment_method': request.payment_method_id},
            )
        except stripe.error.StripeError as e:
            logger.error(f"Error setting default payment method: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error setting default payment method"
            )

        # Create the subscription
        try:
            subscription = stripe.Subscription.create(
                customer=current_user['customer_id'],
                items=[{'price': request.price_id}],
            )

            # Determine new role based on selected plan
            if request.price_id == "price_1Q20s1CEMBb05tfo9t6wpIaF":  # Influewave
                new_role = "influewave"
            elif request.price_id == "price_1Q20uGCEMBb05tfoVkZciNJ5":  # CNKAV
                new_role = "cnkav"
            else:  # Free-tier
                new_role = "free_tier"

            # Update user role after subscription success
            await user_collection.update_one(
                {"_id": current_user["_id"]},
                {"$set": {"role": new_role}}
            )

            logger.info(f"User role updated to {new_role} for user {current_user['email']}")

            return {"status": "success", "subscription_id": subscription.id}
        except stripe.error.StripeError as e:
            logger.error(f"Stripe error during subscription creation: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Stripe error occurred while creating the subscription"
            )

    except stripe.error.StripeError as e:
        logger.error(f"Stripe error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="A Stripe error occurred"
        )
    except Exception as e:
        logger.error(f"Unexpected error during subscription: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while creating the subscription"
        )
    

    
@router.post("/add_payment/method")
async def add_payment_method(request: AddPaymentMethodRequest, current_user: user_dependency):
    try:
        payment_method_id = request.payment_method_id
        customer_id = current_user.get('customer_id')
        connected_account_id = current_user.get('connected_account_id')
        print(connected_account_id)
        logger.info(f"Customer ID: {customer_id}, Connected Account ID: {connected_account_id}")

        if not customer_id:
            logger.error("Customer ID is missing")
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User does not have a customer account")
        if not connected_account_id:
            logger.error("Connected Account ID is missing")
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                                detail="User does not have a connected account")

        # Attach the payment method to the customer account
        stripe.PaymentMethod.attach(
            payment_method_id,
            customer=customer_id
        )

        # Set the payment method as the default for the customer
        stripe.Customer.modify(
            customer_id,
            invoice_settings={"default_payment_method": payment_method_id},
        )

        # Attach to connected account
        # stripe.PaymentMethod.attach(
        #     payment_method_id,
        #     stripe_account=connected_account_id,
        # )

        return {"status": "success", "payment_method_id": payment_method_id}

    except stripe.error.InvalidRequestError as e:
        logger.error(f"Stripe invalid request error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid request: {e.user_message or str(e)}"
        )
    except stripe.error.StripeError as e:
        logger.error(f"Stripe error during adding payment method: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Stripe error occurred while adding the payment method"
        )
    except Exception as e:
        logger.error(f"Error during adding payment method: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred while adding the payment method"
        )




@router.post("/action/affiliate/subscribe")
async def subscribe_to_plan(request: SubscribeRequest, current_user: user_dependency):
    logger.info("Starting subscription process")
    
    try:
        # Ensure the user has a Stripe customer ID or create one if necessary
        if not current_user.get('customer_id'):
            logger.info(f"Creating a new Stripe customer for user: {current_user['email']}")
            try:
                # Create a new customer if it doesn't exist
                customer = stripe.Customer.create(
                    email=current_user['email'],
                    payment_method=request.payment_method_id,
                )
                current_user['customer_id'] = customer.id
            except stripe.error.StripeError as e:
                logger.error(f"Failed to create Stripe customer: {str(e)}")
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Failed to create Stripe customer"
                )

        logger.info(f"Payment method ID received: {request.payment_method_id}")
        logger.info(f"Customer ID: {current_user['customer_id']}")

        # Verify the payment method is valid
        try:
            payment_method = stripe.PaymentMethod.retrieve(request.payment_method_id)
        except stripe.error.InvalidRequestError:
            logger.error(f"Invalid payment method ID: {request.payment_method_id}")
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid payment method ID")

        # Attach the payment method to the customer
        try:
            stripe.PaymentMethod.attach(
                request.payment_method_id,
                customer=current_user['customer_id'],
            )
        except stripe.error.StripeError as e:
            logger.error(f"Error attaching payment method to customer: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error attaching payment method"
            )

        try:
            stripe.Customer.modify(
                current_user['customer_id'],
                invoice_settings={'default_payment_method': request.payment_method_id},
            )
        except stripe.error.StripeError as e:
            logger.error(f"Error setting default payment method: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error setting default payment method"
            )

        # Affiliate logic: check if affiliate link exists and assign commission
        if request.affiliate_link:
            logger.info(f"Affiliate link detected: {request.affiliate_link}")
            
            # Extract affiliate information from the link (e.g., affiliate_id or email)
            affiliate = await affiliate_links_collection.find_one({"link": request.affiliate_link})
            logger.info(affiliate)
            if not affiliate:
                logger.error(f"Affiliate not found for link: {request.affiliate_link}")
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Affiliate not found")
            
            # Calculate commission (e.g., 15% of subscription price)
            commission = request.amount * 0.15
            logger.info(f"Commission of {commission} calculated for affiliate {affiliate['email']}")
            
            sale_record = salesSchema(
            affiliate_id=(affiliate["affiliate_id"]),  
            customer_id=current_user['customer_id'],
            product_id=request.price_id,
            sale_amount=request.amount,
            commission=float(commission),
            timestamp=datetime.now(),
            total_commission=commission
)

            await sales_collection.insert_one(sale_record.dict())  
            logger.info(f"Commission of {commission} recorded for affiliate {affiliate['email']}")

        # Create the subscription
        try:
            subscription = stripe.Subscription.create(
                customer=current_user['customer_id'],
                items=[{'price': request.price_id}],
            )
            logger.info(f"Subscription created: {subscription.id}")
            return {"status": "success", "subscription_id": subscription.id}
        except stripe.error.StripeError as e:
            logger.error(f"Stripe error during subscription creation: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Stripe error occurred while creating the subscription"
            )

    except stripe.error.StripeError as e:
        logger.error(f"Stripe error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="A Stripe error occurred"
        )
    except Exception as e:
        logger.error(f"Unexpected error during subscription: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while creating the subscription"
        )
    
    logger.warning("Returning fallback response")
    return {"status": "failed", "message": "An unexpected error occurred"}






@router.post("/action/change-plan")
async def change_subscription_plan(request: ChangePlanRequest, current_user: user_dependency):
    try:
        # Ensure the user has a Stripe customer ID
        if not current_user.get('customer_id'):
            logger.error("Customer ID not found for the current user.")
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Customer not found")

        # Retrieve the customer's active subscription
        try:
            subscriptions = stripe.Subscription.list(customer=current_user['customer_id'], limit=1)
            if len(subscriptions.data) == 0:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No active subscription found")

            current_subscription = subscriptions.data[0]  # Assuming there's only one active subscription
            logger.info(f"Current subscription ID: {current_subscription.id}")
        except stripe.error.StripeError as e:
            logger.error(f"Error retrieving subscription for customer {current_user['customer_id']}: {str(e)}")
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                                detail="Error retrieving subscription")

        # Update the subscription to the new plan
        try:
            updated_subscription = stripe.Subscription.modify(
                current_subscription.id,
                items=[{
                    'id': current_subscription['items']['data'][0].id,
                    'price': request.new_price_id,  # New plan's price ID
                }],
                proration_behavior='create_prorations',  # Handle prorations for the new plan
            )
            logger.info(f"Subscription {current_subscription.id} updated to new plan {request.new_price_id}")
            return {"status": "success", "subscription_id": updated_subscription.id}
        except stripe.error.StripeError as e:
            logger.error(f"Stripe error during plan change: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error occurred while changing the subscription plan"
            )

    except Exception as e:
        logger.error(f"Unexpected error during plan change: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while changing the subscription plan"
        )
