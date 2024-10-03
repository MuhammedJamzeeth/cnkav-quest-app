from passlib.context import CryptContext
from pydantic import BaseModel, Field, EmailStr, BeforeValidator
from typing import Optional
from typing_extensions import Annotated

# Represents an ObjectId field in the database.
# It will be represented as a `str` on the model so that it can be serialized to JSON.
PyObjectId = Annotated[str, BeforeValidator(str)]

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class UserModel(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    name: str = Field(...)
    email: EmailStr = Field(...)
    hashed_password: str = Field(...)
    role: str
    customer_id: Optional[str] = Field(default=None)  # Add customer_id property


class UpdateDetails(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: EmailStr
    new_password: Optional[str] = None
    image: Optional[str] = None

    def hash_password(self):
        self.new_password = bcrypt_context.hash(self.new_password)
