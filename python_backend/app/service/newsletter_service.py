import logging
import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from fastapi import HTTPException
from starlette import status
from starlette.responses import JSONResponse

from app.db.database import newsletter_collection
from app.models.newsletter_email import NewsLetter

logger = logging.getLogger(__name__)

logo_url = "https://www.cnkav.com/assets/cnkav-logo-DIOzDABb.png"

# Configuration for email
EMAIL_HOST = os.getenv('HOST')
EMAIL_PORT = int(os.getenv('PORT'))
EMAIL_USERNAME = os.getenv('FROM')
EMAIL_PASSWORD = os.getenv('PASSWORD')
EMAIL_FROM = os.getenv('FROM')
EMAIL_SUBJECT = 'News Letter Email for CNKAV'
BACKEND_URL = os.getenv('BACKEND_URL')

# Check for missing environment variables
required_env_vars = ['HOST', 'PORT', 'FROM', 'PASSWORD', 'BACKEND_URL']
missing_vars = [var for var in required_env_vars if not os.getenv(var)]
if missing_vars:
    raise EnvironmentError(f"Missing environment variables: {', '.join(missing_vars)}")


async def send_email(to_email: str, subject: str, body: str):
    """
    Send an email with the given subject and body to the specified recipient.
    """
    try:
        # Create the email message
        message = MIMEMultipart("alternative")
        message["From"] = EMAIL_FROM
        message["To"] = to_email
        message["Subject"] = subject

        part = MIMEText(body, "html")
        message.attach(part)

        logger.info(f"Connecting to SMTP server at {EMAIL_HOST}:{EMAIL_PORT}")

        # Set up the SMTP connection
        with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT) as smtp:
            smtp.starttls()
            logger.info("Starting TLS")
            # Log in to the SMTP server
            smtp.login(EMAIL_USERNAME, EMAIL_PASSWORD)
            logger.info("Logged in successfully")
            # Send the email
            smtp.send_message(message)

        logger.info(f"Email sent successfully to {to_email}")

    except smtplib.SMTPRecipientsRefused as e:
        logger.error(f"Failed to send email to {to_email}: {e}")
        raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED, detail="Invalid address")
    except smtplib.SMTPAuthenticationError as e:
        logger.error(f"SMTP authentication failed: {e}")
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="SMTP authentication failed")
    except smtplib.SMTPException as e:
        logger.error(f"Failed to send email to {to_email}: {e}", exc_info=True)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to send email")
    except Exception as e:
        logger.error(f"Unexpected error occurred while sending email: {e}", exc_info=True)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error")


async def add_newsletter_email(email: NewsLetter):
    body = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {{
                background-color: #000000;
                color: #ffffff;
                font-family: 'Arial', sans-serif;
                margin: 0;
                padding: 0;
            }}
            .email-container {{
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
                background-color: #000000;
                border: 1px solid #ffffff;
                border-radius: 10px;
            }}
            .logo {{
                margin: 20px 0;
            }}
            .logo img {{
                width: 80px;
                height: auto;
            }}
            .content {{
                margin: 20px 0;
            }}
            .content h1 {{
                font-size: 24px;
                color: #ffffff;
                margin-bottom: 20px;
            }}
            .content p {{
                font-size: 16px;
                color: #ffffff;
                margin-bottom: 20px;
            }}
            .button {{
                display: inline-block;
                width: 60%;
                padding: 12px 0;
                font-size: 16px;
                color: #ffffff;
                background-color: transparent;
                border: 2px solid yellow;
                border-radius: 6px;
                font-weight: bold;
                text-decoration: none;
                transition: background-color 0.3s ease, color 0.3s ease, border 0.3 ease;
                border-image: linear-gradient(120deg, red, yellow) 1;
            }}
            .button:hover {{
                border-color: #131212;
                background-color: #131212;
                color: yellow;
            }}
            .footer {{
                margin-top: 30px;
                font-size: 12px;
                color: #aaaaaa;
            }}
            .footer a {{
                color: #ffffff;
                text-decoration: underline;
            }}
            .footer a:hover {{
                color: yellow;
            }}
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="logo">
                <img src="{logo_url}" alt="CNKAV Logo">
            </div>
            <div class="content">
                <h1>Welcome to CNKAV Newsletter</h1>
                <p>Thank you for signing up for our newsletter! We're thrilled to have you on board.</p>
                <p>You will receive the latest news and updates directly in your inbox.</p>
                    <a href="https://www.cnkav.com" class="button">Log In</a>
              
            </div>
            <div class="footer">
                <p>&copy; 2024 CNKAV Team. All rights reserved.</p>
                <p><a href="https://www.cnkav.com/terms">Terms and Conditions</a></p>
            </div>
        </div>
    </body>
    </html>
    """
    try:
        is_exists = await newsletter_collection.find_one({"email": email.email})
        if is_exists:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already added")
        result = await newsletter_collection.insert_one({"email": email.email})
        if result.inserted_id:
            await send_email(email.email, EMAIL_SUBJECT, body)
            return JSONResponse(
                content={"message": "Newsletter added successfully", "event_id": str(result.inserted_id)},
                status_code=status.HTTP_201_CREATED)
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error(f"Error adding newsletter {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error while adding newsletter"
        )


async def get_all_newsletter():
    try:
        results = await newsletter_collection.find().to_list(length=None)
        if not results:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Events not found")

        for result in results:
            result["_id"] = str(result["_id"])

        return results
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error(f"Error fetching newsletter: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error while fetching newsletter"
        )
