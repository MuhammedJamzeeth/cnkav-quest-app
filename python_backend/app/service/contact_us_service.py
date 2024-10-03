import logging
import os
import smtplib
import imaplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from fastapi import HTTPException
from starlette import status
from starlette.responses import JSONResponse

from app.db.database import contact_us_collection
from app.models.contact_us import ContactUs

logger = logging.getLogger(__name__)

# Configuration for email
EMAIL_HOST = os.getenv('HOST')
EMAIL_PORT = int(os.getenv('PORT'))
EMAIL_USERNAME = os.getenv('FROM')
EMAIL_PASSWORD = os.getenv('PASSWORD')
EMAIL_FROM = os.getenv('FROM')
EMAIL_SUBJECT = 'Contactus Confirmation for CNKAV Team'
BACKEND_URL = os.getenv('BACKEND_URL')

# Check for missing environment variables
required_env_vars = ['HOST', 'PORT', 'FROM', 'PASSWORD', 'BACKEND_URL']
missing_vars = [var for var in required_env_vars if not os.getenv(var)]
if missing_vars:
    raise EnvironmentError(f"Missing environment variables: {', '.join(missing_vars)}")


# IMAP_HOST = os.getenv('IMAP_HOST')
# IMAP_PORT = int(os.getenv('IMAP_PORT'))
# IMAP_USERNAME = os.getenv('IMAP_USERNAME')
# IMAP_PASSWORD = os.getenv('IMAP_PASSWORD')
#
#
# def check_email():
#     """
#     Check the number of emails in the inbox using IMAP.
#     """
#     try:
#         with imaplib.IMAP4_SSL(IMAP_HOST, 587) as mail:
#             mail.login(IMAP_USERNAME, IMAP_PASSWORD)
#             mail.select('inbox')
#             statuses, messages = mail.search(None, 'ALL')
#             print(f"Number of emails: {len(messages[0].split())}")
#     except Exception as e:
#         print(f"Error checking emails: {e}")
#

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


async def save_contact_us_info_all(contact_us_info: ContactUs):
    """
    Save the contact us information to the database.

    Args:
        contact_us_info (ContactUs): The contact us data to be saved, provided as a ContactUs model instance.

    Returns:
        JSONResponse: A JSON response indicating the result of the operation.
        - On success: Returns a 201 Created status with a success message and the ID of the created document.
        - On failure: Raises HTTPException with appropriate status codes and error details.

    Raises:
        HTTPException: If the contact us information cannot be saved or if an internal error occurs.
    """
    try:
        contact_us_data = contact_us_info.dict()
        email = contact_us_data.get('email')
        name = contact_us_data.get('name')
        gender = contact_us_data.get('gender')
        marital = contact_us_data.get('marital')
        employed = contact_us_data.get('employed')
        product = contact_us_data.get('product')
        where_you_from = contact_us_data.get('where_you_from')
        religion = contact_us_data.get('religion')
        capital = contact_us_data.get('capital')
        similar_product = contact_us_data.get('similar_product')
        hardest_product = contact_us_data.get('hardest_product')
        survey = contact_us_data.get('survey')
        motivator = contact_us_data.get('motivator')
        previously = contact_us_data.get('previously')
        current_solution = contact_us_data.get('current_solution')

        result = await contact_us_collection.insert_one(contact_us_data)
        if result.inserted_id is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Contact us information not saved"
            )

        body = f"""\
         <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {{
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    color: #333;
                    margin: 0;
                    padding: 0;
                    background: #f2f2f2;
                }}
                .email-wrapper {{
                    width: 100%;
                    background: #e2e2e2;
                    padding: 20px 0;
                }}
                .container {{
                    background: #ffffff;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    margin: 0 auto;
                    padding: 20px;
                    max-width: 650px;
                }}
                .header {{
                    text-align: center;
                    padding-top: 15px;
                    padding-bottom: 15px;
                    border-bottom: 2px solid #007BFF;
                    background: #007BFF;
                    color: #ffffff;
                    border-radius: 10px 10px 10px 10px;
                }}
                .header img {{
                    max-width: 120px;
                    margin-bottom: 10px;
                }}
                .header h1 {{
                    margin: 0;
                    font-size: 28px;
                    font-weight: bold;
                }}
                .content {{
                    padding: 20px;
                }}
                .content h2 {{
                    color: #333;
                    font-size: 22px;
                    margin-bottom: 15px;
                    font-weight: bold;
                }}
                .content p {{
                    margin: 0 0 20px;
                    line-height: 1.6;
                    font-size: 16px;
                    color: #555;
                }}
                .content ul {{
                    list-style-type: none;
                    padding: 0;
                    margin: 0;
                }}
                .content ul li {{
                    background-color: #f9f9f9;
                    border-radius: 6px;
                    margin-bottom: 12px;
                    padding: 8px;
                    border: 1px solid #ddd;
                    font-size: 16px;
                    color: #333;
                }}
                .button {{
                    display: inline-block;
                    padding: 14px 28px;
                    font-size: 18px;
                    color: #ffffff;
                    background-color: #28a745;
                    border-radius: 5px;
                    text-decoration: none;
                    text-align: center;
                    margin-top: 20px;
                }}
                .button:hover {{
                    background-color: #218838;
                }}
                .footer {{
                    margin-top: 30px;
                    padding-top: 10px;
                    padding-bottom: 10px;
                    border-radius: 10px 10px 10px 10px;
                    border-top: 2px solid #007BFF;
                    background: #007BFF;
                    color: #ffffff;
                    text-align: center;
                    font-size: 14px;
                }}
                .footer a {{
                    color: #ffffff;
                    text-decoration: none;
                }}
                .footer a:hover {{
                    text-decoration: underline;
                }}
            </style>
        </head>
        <body>
            <div class="email-wrapper">
                <div class="container">
                    <div class="header">
                        <h1>Thank You for Reaching Out!</h1>
                    </div>
                    <div class="content">
                        <h2>Hello, {name.capitalize()}</h2>
                        <p>We have received your message and appreciate you taking the time to contact us. Our team is reviewing your message and will get back to you shortly.</p>
                        <p>Here is a summary of the information you provided:</p>
                        <ul>
                            <li><strong>Email:</strong> {email}</li>
                            <li><strong>Name:</strong> {name.capitalize()}</li>
                            <li><strong>Gender:</strong> {gender}</li>
                            <li><strong>Marital Status:</strong> {marital}</li>
                            <li><strong>Employed:</strong> {employed}</li>
                            <li><strong>Product:</strong> {product}</li>
                            <li><strong>Where You Are From:</strong> {where_you_from}</li>
                            <li><strong>Religion:</strong> {religion}</li>
                            <li><strong>Capital:</strong> {capital}</li>
                            <li><strong>Similar Product:</strong> {similar_product}</li>
                            <li><strong>Hardest Product:</strong> {hardest_product}</li>
                            <li><strong>Survey:</strong> {survey}</li>
                            <li><strong>Motivator:</strong> {motivator}</li>
                            <li><strong>Previously:</strong> {previously}</li>
                            <li><strong>Current Solution:</strong> {current_solution}</li>
                        </ul>
                        <p>For more details, please visit <a href="{BACKEND_URL}">our website</a>.</p>
                        <a href="{BACKEND_URL}" class="button">Visit Our Website</a>
                    </div>
                    <div class="footer">
                        <p>&copy; {""} CNKAV Team. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
        """

        await send_email(email, EMAIL_SUBJECT, body)

        return JSONResponse(
            content={"message": "Contact us information saved successfully", "id": str(result.inserted_id)},
            status_code=status.HTTP_201_CREATED
        )

    except HTTPException as e:
        logger.error(f"HTTPException occurred: {e.detail}")
        raise e
    except Exception as e:
        logger.error(f"Unexpected error occurred: {e}", exc_info=True)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error")
