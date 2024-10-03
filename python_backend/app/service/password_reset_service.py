import logging
from datetime import timedelta, datetime
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from fastapi import HTTPException, status
from jose import JWTError
from passlib.context import CryptContext
from dotenv import load_dotenv
import os

from starlette.responses import JSONResponse

from app.db.database import user_collection
from app.schema.password_reset_schema import EmailRequest, PasswordResetRequest
from app.utils.jwt import create_access_token, verify_access_token

# Load environment variables
load_dotenv()

# Set up logging
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

# Password hashing context using bcrypt
bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Configuration for email
EMAIL_HOST = os.getenv('HOST')
EMAIL_PORT = int(os.getenv('PORT'))
EMAIL_USERNAME = os.getenv('FROM')
EMAIL_PASSWORD = os.getenv('PASSWORD')
EMAIL_FROM = os.getenv('FROM')
EMAIL_SUBJECT = 'Password Reset Request'
BACKEND_URL = os.getenv('BACKEND_URL')
EMAIL_TOKEN_EXPIRE_HOURS = int(os.getenv('TOKEN_EXPIRE_HOURS'))

# Check for missing environment variables
required_env_vars = ['HOST', 'PORT', 'FROM', 'PASSWORD', 'BACKEND_URL', 'TOKEN_EXPIRE_HOURS']
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

        # smtp_conn = smtplib.SMTP(EMAIL_HOST)
        # smtp_conn.sendmail()
        # Set up the SMTP connection
        with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT) as smtp:
            # Start TLS for security
            smtp.starttls()

            # Log in to the SMTP server
            smtp.login(EMAIL_USERNAME, EMAIL_PASSWORD)

            # Send the email
            smtp.send_message(message)

        logger.info(f"Email sent successfully to {to_email}")

    except smtplib.SMTPException as e:
        logger.error(f"Failed to send email to {to_email}: {e}", exc_info=True)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to send email")
    except Exception as e:
        logger.error(f"Unexpected error occurred while sending email: {e}", exc_info=True)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error")


async def request_password_reset(email_request: EmailRequest):
    """
    Handle password reset requests by sending an email with a reset link.
    """
    email = email_request.email
    if not email:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email is required")

    try:
        existing_user = await user_collection.find_one({"email": email})
        if not existing_user:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                                detail="User with this email not exists")

        # Generate a password reset token
        token = create_access_token(data={"sub": email}, expire_delta=timedelta(hours=EMAIL_TOKEN_EXPIRE_HOURS))
        link = f"{BACKEND_URL}/Password/reset_password/{token}"

        # HTML email body
        body = f"""
                <html>
                <body style="font-family: Arial, sans-serif; background-color: #f6f6f6; margin: 0; padding: 0;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; margin-top: 50px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                        <tr>
                            <td align="center" bgcolor="#4CAF50" style="padding: 20px 0; border-radius: 8px 8px 0 0; color: #ffffff; font-size: 24px;">
                                Password Reset Request
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 40px 30px 20px 30px;">
                                <p style="margin: 0; color: #333333; font-size: 16px; line-height: 1.5;">
                                    Hello, {str(existing_user.get('name')).capitalize()}
                                </p>
                                <p style="margin: 20px 0 0 0; color: #333333; font-size: 16px; line-height: 1.5;">
                                    You recently requested to reset your password. Click the button below to reset it.
                                </p>
                                <p style="margin: 40px 0 0 0; text-align: center;">
                                    <a href="{link}" style="background-color: #4CAF50; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">Reset Password</a>
                                </p>
                                <p style="margin: 20px 0 0 0; color: #999999; font-size: 14px; line-height: 1.5;">
                                    If you didn't request a password reset, please ignore this email or let us know. This password reset link is only valid for the next hour.
                                </p>
                                <p style="margin: 40px 0 0 0; color: #999999; font-size: 14px; line-height: 1.5;">
                                    Thanks,
                                    <br>The CNKAV Team
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" bgcolor="#f6f6f6" style="padding: 20px; border-radius: 0 0 8px 8px; color: #aaaaaa; font-size: 12px;">
                                &copy; {datetime.utcnow().year} CNKAV Company. All rights reserved.
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
                """
        await send_email(email, EMAIL_SUBJECT, body)
        logger.info(f"Password reset link sent to {email}")
    except HTTPException as e:
        logger.error(f"Error sending password reset email: {e.detail}")
        raise e
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error")

    return JSONResponse(content={"message": "Password reset link sent"}, status_code=status.HTTP_200_OK)


async def reset_password(token: str, password_reset_request: PasswordResetRequest):
    """
    Reset the user's password using the provided token and new password.
    """
    try:
        email = verify_access_token(token, "access")
    except JWTError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid or expired token")

    new_password = password_reset_request.new_password
    confirm_password = password_reset_request.confirm_password

    # Validate new passwords
    if not new_password:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="New password is required")
    if new_password != confirm_password:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Passwords do not match")
    if len(new_password) < 8:  # Example of additional security check
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Password must be at least 8 characters long")

    hashed_password = bcrypt_context.hash(new_password)
    try:
        result = await user_collection.update_one({"email": email}, {"$set": {"password": hashed_password}})
        if result.matched_count == 0:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    except Exception as e:
        logger.error(f"Error updating password: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to update password")

    return JSONResponse(content={"message": "Password has been reset"}, status_code=status.HTTP_200_OK)
