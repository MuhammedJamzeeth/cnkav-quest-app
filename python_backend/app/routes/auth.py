import os
from datetime import timedelta

from fastapi import APIRouter, HTTPException, Depends, Query, Form
from starlette import status
from dotenv import load_dotenv
from typing import Annotated

from app.schema.auth_schema import TokenResponse, LoginRequest
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from app.schema.auth_schema import TokenResponse
from app.service.user_service import authenticate_user
from app.utils.jwt import create_access_token
from fastapi.security import OAuth2PasswordRequestForm
import stripe
import smtplib
from fastapi.responses import RedirectResponse

router = APIRouter(
    prefix='/auth',
    tags=['Auth Management']
)

load_dotenv()

ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES', None)
EMAIL_USERNAME = os.getenv("EMAIL_USERNAME_API_KEY")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD_API_KEY")
EMAIL_HOST = os.getenv('HOST')
EMAIL_PORT = os.getenv("PORT")
STRIPE_API = os.getenv('STRIPE_API_KEY')


@router.post("/login", response_description="Add new user", response_model=TokenResponse,
             response_model_by_alias=False,
             status_code=status.HTTP_200_OK,
             summary="Create a new user",
             description="Create a new user with fullname, email, and password")
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    user = await authenticate_user(form_data.username, form_data.password)

    access_token_expires = timedelta(minutes=int(ACCESS_TOKEN_EXPIRE_MINUTES))
    response = TokenResponse
    response.access_token = create_access_token(
        data={"id": user.id, "name": user.name, "sub": user.email, "role": user.role, "image": user.image,
              "customer_id": user.customer_id, "connected_account_id": user.connected_account_id},
        expire_delta=access_token_expires)
    response.token_type = "bearer"
    return response


stripe.api_key = STRIPE_API
smtp_server = EMAIL_HOST
smtp_port = EMAIL_PORT
email_user = EMAIL_USERNAME
email_password = EMAIL_PASSWORD


@router.get("/success")
# def success_payment(user_id: str = ''):
def success_payment(user_id: str = Query(...), email: str = Query(...)):
    msg = MIMEMultipart()
    print("email::", email)
    msg['From'] = email_user
    msg['To'] = email
    msg['Subject'] = 'Payment Confirmation for cnkav'

    body = 'Your Payment Successful Done.'
    msg.attach(MIMEText(body, 'plain'))
    recipients = [email, EMAIL_USERNAME]

    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(email_user, email_password)
        text = msg.as_string()
        server.sendmail(email_user, recipients, text)
        print("Email sent successfully!")
    except Exception as e:
        print(f"Failed to send email: {e}")

    print(f"Your Payment successful completed for this user_id: {user_id}")

    # Return a response
    url = 'https://backend.cnkav.com/payment_success'
        # url = 'https://backend.cnkav.com/payment_success'

    return RedirectResponse(url)
    # return {"message": f"Your Payment successful completed for this user_id: {user_id}"}


@router.get("/canceled")
def canceled_payment(user_id: str = ''):
    print(f"Payment canceled for user_id: {user_id}")
    url = 'https://backend.cnkav.com/payment_cancel'
    return RedirectResponse(url)
    # return {"message": f"Payment canceled for user_id: {user_id}"}


@router.post('/create-checkout-session')
async def create_checkout_session(
        user_id: str = Form(...),
        price: float = Form(...),
        name: str = Form(...),
        email: str = Form(...),
):
    try:
        price = round(price)
        price = int(f'{price}00')
        print(price)

        YOUR_DOMAIN = 'https://backend.cnkav.com'
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[
                {
                    'price_data': {
                        'currency': 'usd',
                        'unit_amount': int(price),
                        'product_data': {
                            'name': name,
                        },
                    },
                    'quantity': 1,
                }
            ],
            metadata={
                "user_id": user_id,
            },
            mode='payment',
            success_url=YOUR_DOMAIN + f'auth/success?user_id={user_id}&email={email}',
            cancel_url=YOUR_DOMAIN + f'auth/canceled?user_id={user_id}',
        )

    except Exception as e:
        response = {
            "status": False,
            "hosted_url": '',
            "error": str(e)
        }
        return response
    response = {
        "status": True,
        "hosted_url": checkout_session.url,
        "error": ''
    }
    return response

    # return RedirectResponse(checkout_session.url)


@router.get("/news-letter")
def news_letter_fun(email: str = Query(...)):
    msg = MIMEMultipart()
    print("email::", email)
    msg['From'] = email_user
    msg['To'] = email
    msg['Subject'] = 'News Letter Email  for cnkav'

    body = 'Conformation News Letter for Cnkav Team.'
    msg.attach(MIMEText(body, 'plain'))
    recipients = [email, 'infocnkav@gmail.com']

    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(email_user, email_password)
        text = msg.as_string()
        server.sendmail(email_user, recipients, text)

    except Exception as e:
        print(f"Failed to send email: {e}")

    return {"status": True, "message": f"Email Send For against this email:{email}"}


@router.post("/contactus-email")
def contactus_function(
        name: str = Form(...),
        email: str = Form(...),
        gender: str = Form(...),
        marital: str = Form(...),
        employed: str = Form(...),
        product: str = Form(...),
        where_you_from: str = Form(...),
        religion: str = Form(...),
        capital: str = Form(...),
        similar_product: str = Form(...),
        hardest_product: str = Form(...),
        survey: str = Form(...),
        motivator: str = Form(...),
        previously: str = Form(...),
        current_solution: str = Form(...)
):
    msg = MIMEMultipart()
    print("email::", email)
    msg['From'] = email_user
    msg['To'] = email
    msg['Subject'] = 'Contactus Confirmation for CNKAV Team'

    body = (
        f'Dear {name},\n\n'
        f'Thank you for reaching out to us at CNKAV! We have received your message and appreciate you taking the time to contact us.\n\n'
        f'Here are the details you provided:\n'
        f'- Gender: {gender}\n'
        f'- Marital Status: {marital}\n'
        f'- Employed: {employed}\n'
        f'- Product Interested: {product}\n'
        f'- Where You Are From: {where_you_from}\n'
        f'- Religion: {religion}\n'
        f'- Capital: {capital}\n'
        f'- Similar Product Used: {similar_product}\n'
        f'- Hardest Product Experience: {hardest_product}\n'
        f'- Survey Responses: {survey}\n'
        f'- Motivator: {motivator}\n'
        f'- Previously Used Solutions: {previously}\n'
        f'- Current Solution: {current_solution}\n\n'
        f'We will get back to you shortly. If you have any additional information to share or any questions, feel free to reply to this email.\n\n'
        f'Best regards,\n'
        f'The CNKAV Team'
    )

    msg.attach(MIMEText(body, 'plain'))
    recipients = [email, 'infocnkav@gmail.com']

    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(email_user, email_password)
        text = msg.as_string()
        server.sendmail(email_user, recipients, text)
        print("Email sent successfully!")
    except Exception as e:
        print(f"Failed to send email: {e}")

    return {"status": True, "message": f"Email Send For against this email:{email}"}
