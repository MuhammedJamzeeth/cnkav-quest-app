from pydantic import BaseModel, EmailStr, HttpUrl


class CreateProductRequest(BaseModel):
    full_name: str
    user_id: str
    email: EmailStr
    company_name: str
    company_website: HttpUrl
    phone_number: str
    size_and_revenue: str
    product_image: str
    pending: bool = True
