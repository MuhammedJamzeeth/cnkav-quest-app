import logging
from fastapi import APIRouter, Form, HTTPException
from app.schema.password_reset_schema import EmailRequest, PasswordResetRequest
from app.service.password_reset_service import request_password_reset, reset_password

# Setting up the logger for logging information
logger = logging.getLogger(__name__)

# Creating a router for user management routes
router = APIRouter(
    prefix='/password',
    tags=['Reset Password Route']
)


@router.post("/reset_password")
async def reset_password_request(request: EmailRequest):
    """
        Handles POST requests for password reset initiation.

        Args:
        - request (EmailRequest): The user's email wrapped in a request object as defined by the EmailRequest schema.

        Returns:
        - Response: JSON response from the password reset service.

        Raises:
        - HTTPException: For any exceptions caught during the process.
    """
    try:
        return await request_password_reset(request)
    except Exception as e:
        raise e


@router.post("/reset_password/{token}")
async def reset_password_token_post(token: str, new_password: str = Form(...)):
    """
       Completes the password reset process using a token received by the user via email.

       Args:
       - token (str): The password reset token that verifies the user's request.
       - new_password (str): The new password provided by the user through a form submission.

       Returns:
       - Response: JSON response from the password reset service confirming the update.

       Raises:
       - HTTPException: Specific exceptions related to the password reset process or a general exception for other errors.
    """
    request = PasswordResetRequest(new_password=new_password)
    try:
        return await reset_password(token, request)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
