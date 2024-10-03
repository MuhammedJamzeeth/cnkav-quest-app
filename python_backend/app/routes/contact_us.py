import logging

from fastapi import APIRouter, status

from app.models.contact_us import ContactUs
from app.service.contact_us_service import save_contact_us_info_all

router = APIRouter(
    prefix='/contact',
    tags=['Contact Us Question Management']
)

logger = logging.getLogger(__name__)


@router.post("", response_description="Submit contact us information for all questions",
             status_code=status.HTTP_201_CREATED)
async def contact_us_all_questions(contact_us_info: ContactUs):
    """
       Endpoint to submit contact us information.

       Args:
           contact_us_info (ContactUs): The contact us data to be saved, provided as a ContactUs model instance.

       Returns: JSONResponse: A JSON response with a message indicating the submission result and the ID of the
       created document.
    """
    return await save_contact_us_info_all(contact_us_info)
