from pydantic import BaseModel, EmailStr


class EmailRequest(BaseModel):
    email: EmailStr


class PasswordResetRequest(BaseModel):
    new_password: str
