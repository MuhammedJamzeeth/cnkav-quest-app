from pydantic import BaseModel, Field, EmailStr, HttpUrl, BeforeValidator
from typing import Optional
from typing_extensions import Annotated

PyObjectId = Annotated[str, BeforeValidator(str)]


class ProductRequest(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    full_name: str = Field(...)
    email: EmailStr = Field(...)
    company_name: str = Field(...)
    company_website: HttpUrl = Field(...)
    phone_number: str = Field(...)
    size_and_revenue: str = Field(...)
    product_image: str = Field(...)
