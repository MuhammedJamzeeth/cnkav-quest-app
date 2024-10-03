from pydantic import BaseModel, EmailStr, Field


class NewsLetter(BaseModel):
    email: EmailStr = Field(...)
