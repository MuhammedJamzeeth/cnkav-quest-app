import stripe
import uuid
from fastapi import APIRouter, HTTPException, Form, Request, Depends
from fastapi.responses import RedirectResponse
from fastapi.security import OAuth2PasswordBearer

from datetime import datetime
from pydantic import BaseModel
from typing import Optional
from app.db.database import user_collection
from app.db.database import ticket_app_collection
from app.models.ticket import Ticket  # Assuming this is your ORM model
import os
import logging
from app.utils.jwt import user_dependency

# Set up logging
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
logging.basicConfig(level=logging.INFO)

router = APIRouter(
    prefix='/ticket',
    tags=['tickets']
)

# Stripe API Key from environment variable
stripe.api_key = os.getenv('STRIPE_API_KEY')

class CheckoutSessionRequest(BaseModel):
    user_id: str
    price: float
    name: str
    email: str
    event_id: str
    customer_id: str


@router.post('/create-checkout-session')
async def create_checkout_session(request: CheckoutSessionRequest):
    
    
    try:
        # Step 1: Retrieve the connected account
        connected_account = stripe.Account.retrieve(request.customer_id)
        print("this is connect accuont")
        print(connected_account)
        # Step 2: Check if the account is restricted
        if connected_account['requirements']['disabled_reason']:
            # Account is restricted, create an account link for onboarding
            account_link = stripe.AccountLink.create(
                account= request.customer_id,
                refresh_url='https://backend.cnkav.com/',
                return_url='https://backend.cnkav.com/',
                type='account_onboarding'
            )
            return {
                "status": False,
                "error": "Account requires verification",
                "redirect_url": account_link.url
            }

        # Step 3: If account is verified, proceed with checkout session creation
        price_in_cents = int(round(request.price * 100))
        # YOUR_DOMAIN = 'http://localhost:8000/'
        YOUR_DOMAIN =  'https://backend.cnkav.com/'

        # Calculate company fee (30%) in cents
        company_fee_in_cents = int(round(price_in_cents * 0.30))

        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'usd',
                    'unit_amount': price_in_cents,
                    'product_data': {
                        'name': request.name,
                    },
                },
                'quantity': 1,
            }],
            metadata={
                "user_id": request.user_id,
                "event_id": request.event_id,
                "email": request.email,
            },
            mode='payment',
            success_url=YOUR_DOMAIN + 'ticket/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url=YOUR_DOMAIN + f'ticket/cancel?user_id={request.user_id}',
            payment_intent_data={
                "application_fee_amount": company_fee_in_cents,
                "transfer_data": {
                    "destination": request.customer_id
                },
            }
        )

        return {
            "status": True,
            "hosted_url": checkout_session.url,
            "error": ''
        }

    except Exception as e:
        logger.error(f'Error creating checkout session: {e}')
        raise HTTPException(status_code=500, detail="Error creating checkout session")


    
@router.get("/success")
async def payment_success(request: Request):
    try:
        # Extract the session_id from query parameters
        session_id = request.query_params.get('session_id')
        if not session_id:
            raise HTTPException(status_code=400, detail="session_id query parameter is required")

        # Retrieve the session based on session_id
        session = stripe.checkout.Session.retrieve(session_id)
        logger.info("Session ID: %s", session_id)
        logger.info("Session metadata: %s", session.metadata)

        if session.payment_status == 'paid':
            # Extract metadata from the session
            user_id = session.metadata['user_id']
            email = session.metadata['email']
            event_id = session.metadata['event_id']

            # Create the new ticket as a dictionary
            new_ticket = {
                "event_id": str(event_id),  # Ensure event_id is a string
                "user_id": str(user_id),    # Ensure user_id is a string
                "purchase_date": datetime.utcnow(),
                "price": session.amount_total / 100,  # Stripe gives amounts in cents, convert back to dollars
                "payment_method": "regular",
                "status": "confirmed",
                "ticket_code": str(uuid.uuid4().hex)
            }

            # Save the ticket to the database
            result = await ticket_app_collection.insert_one(new_ticket)

            # Fetch the inserted document to return its data
            inserted_ticket = await ticket_app_collection.find_one({"_id": result.inserted_id})

            # Convert MongoDB ObjectId to string for JSON response
            if inserted_ticket:
                inserted_ticket["_id"] = str(inserted_ticket["_id"])

            return RedirectResponse(url="http://backend.cnkav.com/dashboard/purchased-events", status_code=302)

            # return RedirectResponse(url="https://cnkav.com/dashboard/purchased-events", status_code=302)
        else:
            raise HTTPException(status_code=400, detail="Payment not successful")
    except Exception as e:
        logger.error(f'Error processing payment success: {e}')
        raise HTTPException(status_code=500, detail="Error processing payment success")





# Define the OAuth2 password bearer
oauth_bearer = OAuth2PasswordBearer(tokenUrl="auth/token")

async def get_current_user(token: str = Depends(oauth_bearer)):
    # You should implement your user retrieval logic based on the token
    user = await user_collection.find_one({"token": token})  # Replace with actual token decoding and user fetching logic
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication credentials")
    return user





@router.post('/create-checkout-session-crypto')
async def create_checkout_session(request: CheckoutSessionRequest):
    logger.info(f"Received data: {request.dict()}")
    
    try:
        # Retrieve the connected account
        connected_account = stripe.Account.retrieve(request.customer_id)

        # Check if the account is restricted
        if connected_account['requirements']['disabled_reason']:
            # Create an account link for onboarding
            account_link = stripe.AccountLink.create(
                account=request.customer_id,
                refresh_url='https://backend.cnkav.com',
                return_url='https://backend.cnkav.com',
                type='account_onboarding'
            )
            return {
                "status": False,
                "error": "Account requires verification",
                "redirect_url": account_link.url
            }

        price_in_cents = int(round(request.price * 100))
        YOUR_DOMAIN = 'https://backend.cnkav.com/'

        # Calculate company fee (30%) in cents
        company_fee_in_cents = int(round(price_in_cents * 0.30))

        if request.payment_method == 'crypto':

            
            payment_intent = stripe.PaymentIntent.create(
                amount=price_in_cents,
                currency='usd',  # Change currency if needed
                payment_method_types=['card'],
                metadata={
                    "user_id": request.user_id,
                    "event_id": request.event_id,
                    "email": request.email
                },
            )

            return {
                "status": True,
                "client_secret": payment_intent.client_secret,
                "error": ''
            }

        # If it's a regular payment
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'usd',
                    'unit_amount': price_in_cents,
                    'product_data': {
                        'name': request.name,
                    },
                },
                'quantity': 1,
            }],
            metadata={
                "user_id": request.user_id,
                "event_id": request.event_id,
                "email": request.email
            },
            mode='payment',
            success_url=YOUR_DOMAIN + 'ticket/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url=YOUR_DOMAIN + f'ticket/cancel?user_id={request.user_id}',
            payment_intent_data={
                "application_fee_amount": company_fee_in_cents,
                "transfer_data": {
                    "destination": request.customer_id
                },
            }
        )

        return {
            "status": True,
            "hosted_url": checkout_session.url,
            "error": ''
        }

    except Exception as e:
        logger.error(f'Error creating checkout session: {e}')
        raise HTTPException(status_code=500, detail="Error creating checkout session")



@router.post("/crypto-success")
async def payment_success(request: Request):
    try:
        # Extract the session_id from query parameters
        session_id = request.query_params.get('session_id')
        if not session_id:
            raise HTTPException(status_code=400, detail="session_id query parameter is required")

        # Retrieve the session based on session_id
        session = stripe.checkout.Session.retrieve(session_id)
        logger.info("Session ID: %s", session_id)
        logger.info("Session metadata: %s", session.metadata)

        if session.payment_status == 'paid':
            user_id = session.metadata['user_id']
            email = session.metadata['email']
            event_id = session.metadata['event_id']

            new_ticket = {
                "event_id": str(event_id),
                "user_id": str(user_id),
                "purchase_date": datetime.utcnow(),
                "price": session.amount_total / 100,
                "payment_method": "regular",  # Or "crypto" if applicable
                "status": "confirmed",
                "ticket_code": str(uuid.uuid4().hex)
            }

            result = await ticket_app_collection.insert_one(new_ticket)
            inserted_ticket = await ticket_app_collection.find_one({"_id": result.inserted_id})

            if inserted_ticket:
                inserted_ticket["_id"] = str(inserted_ticket["_id"])

            return RedirectResponse(url="https://backend.cnkav.com/dashboard/purchased-events", status_code=302)
        else:
            raise HTTPException(status_code=400, detail="Payment not successful")
    except Exception as e:
        logger.error(f'Error processing payment success: {e}')
        raise HTTPException(status_code=500, detail="Error processing payment success")
