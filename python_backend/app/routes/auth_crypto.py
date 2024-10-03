from datetime import timedelta

from fastapi import APIRouter, HTTPException, Depends, Query, Form
from coinbase_commerce.client import Client
from starlette import status
from dotenv import load_dotenv
from typing import Annotated

load_dotenv()

ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES', None)
COINBASE_COMMERCE_API_KEY = os.getenv("COINBASE_COMMERCE_API_KEY")
client = Client(api_key=COINBASE_COMMERCE_API_KEY)


@router.post("/login", response_description="Add new user", response_model=TokenResponse,
             def canceled_payment(user_id: str = ''):
    # return {"message": f"Payment canceled for user_id: {user_id}"}


@router.post('/create-checkout-session')
async def create_checkout_session(
        user_id: str = Form(...),
        price: float = Form(...),
        name: str = Form(...),
        email: str = Form(...),
):


# @router.post('/create-checkout-session')
# async def create_checkout_session(
#         user_id: str = Form(...),
#         price: float = Form(...),
#         name: str = Form(...),
#         email: str = Form(...),
# ):
    try:
        price = round(price)
        price = int(f'{price}00')
@@ -141,3 +146,97 @@ async def create_checkout_session(
    return response

    # return RedirectResponse(checkout_session.url)




@router.post('/create-coinbase-charge')
async def create_coinbase_charge(
        user_id: str = Form(...),
        price: float = Form(...),
        name: str = Form(...),
        email: str = Form(...),
):
    try:
        # Define charge data
        charge_data = {
            'name': name,
            'description': 'Payment for services',
            'local_price': {
                'amount': str(price),
                'currency': 'USD'
            },
            'pricing_type': 'fixed_price',
            'metadata': {
                'user_id': user_id,
                'email': email
            },
            'redirect_url': f'https://backend.cnkav.comauth/success?user_id={user_id}&email={email}',
            'cancel_url': f'https://backend.cnkav.comauth/canceled?user_id={user_id}'
        }

        # Create the charge
        charge = client.charge.create(**charge_data)

        response = {
            "status": True,
            "url": charge.hosted_url,
            "error": ''
        }

    except Exception as e:
        response = {
            "status": False,
            "url": '',
            "error": str(e)
        }

    return response

    try:
        # Convert price to the smallest currency unit (e.g., cents for USD)
        price_in_cents = round(price * 100)

        # Define your domain
        YOUR_DOMAIN = 'https://backend.cnkav.com'

        # Create a Stripe Checkout Session for crypto payment
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[
                {
                    'price_data': {
                        'currency': 'usd',
                        'unit_amount': price_in_cents,
                        'product_data': {
                            'name': name,
                        },
                    },
                    'quantity': 1,
                }
            ],
            mode='payment',
            success_url=YOUR_DOMAIN + f'auth/success?user_id={user_id}&email={email}',
            cancel_url=YOUR_DOMAIN + f'auth/canceled?user_id={user_id}',
            payment_method_options={
                "usdc": {
                    "enabled": True
                }
            },
            onramp=True  # Enabling Stripe Onramp for crypto purchases
        )

        response = {
            "status": True,
            "url": checkout_session.url,
            "error": ''
        }

    except Exception as e:
        response = {
            "status": False,
            "url": '',
            "error": str(e)
        }

    return response

    #main
    import uvicorn
from fastapi import FastAPI
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware

import stripe
from dotenv import load_dotenv
import logging
import os
from starlette.middleware.sessions import SessionMiddleware

from app.db.database import check_mongo_connection
from app.routes.user import router as user_router
from app.routes.auth import router as auth_router
@@ -14,6 +143,7 @@
import os
from starlette.middleware.sessions import SessionMiddleware

# Load environment variables
load_dotenv()

# Retrieve SECRET_KEY from environment variables
@@ -44,29 +174,60 @@
    allow_headers=["*"],  # Adjust headers if necessary for stricter security
)

# Add Session middleware
app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY)

# Include routers for different endpoints
app.include_router(auth_router)
app.include_router(user_router)
app.include_router(quest_router)
app.include_router(auth_router)
app.include_router(user_router)
app.include_router(quest_router)
app.include_router(community_router)
app.include_router(address_router)
app.include_router(event_router)

# Add Session middleware
app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY)
# Crypto payment route using Stripe
@app.post("/create-checkout-session/")
async def create_checkout_session(request: Request):
    try:
        data = await request.json()
        # Example product data from the client
        product_name = data.get("name", "Crypto Payment")
        amount = data.get("amount", 5000)  # amount in cents

        # Create a Stripe Checkout Session
        session = stripe.checkout.Session.create(
            payment_method_types=["crypto"],
            line_items=[
                {
                    "price_data": {
                        "currency": "usd",
                        "product_data": {
                            "name": product_name,
                        },
                        "unit_amount": amount,
                    },
                    "quantity": 1,
                },
            ],
            mode="payment",
            success_url="https://yourdomain.com/success",
            cancel_url="https://yourdomain.com/cancel",
        )
        return {"id": session.id}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Startup event to check MongoDB connection
@app.on_event("startup")
async def startup_event():
    await check_mongo_connection()

# A simple root route
@app.get("/")
def read_root():
    return {"message": "Hello World"}

if __name__ == "__main__":
    uvicorn.run(
        app="app.main:app",
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True

#       const response = await axios.post("https://backend.cnkav.comauth/create-checkout-session", formData);
#       const response = await axios.post("http://127.0.0.1:8000/auth/create-coinbase-charge", formData);