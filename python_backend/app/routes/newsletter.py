from fastapi import APIRouter, HTTPException
from pydantic import EmailStr
from starlette import status

from app.models.newsletter_email import NewsLetter
from app.service.newsletter_service import add_newsletter_email, get_all_newsletter

router = APIRouter(
    prefix='/newsletter',
    tags=['Newsletter Management']
)


@router.post("", response_description="Add a new newsletter", status_code=status.HTTP_201_CREATED)
async def create(email: NewsLetter):
    try:
        return await add_newsletter_email(email)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise e


@router.get("/all", response_description="Get all events for a user", status_code=status.HTTP_200_OK)
async def get_all():
    return await get_all_newsletter()
