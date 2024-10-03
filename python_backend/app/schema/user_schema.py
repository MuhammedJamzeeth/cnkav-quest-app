from pydantic import BaseModel, EmailStr, Field
from passlib.context import CryptContext
from datetime import datetime
from typing import Optional

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class CreateUserRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str
    customer_id: str

    def hash_password(self):
        self.password = bcrypt_context.hash(self.password)

    class Config:
        json_schema_extra = {
            "example": {
                "name": "john",
                "email": "john.doe@example.com",
                "password": "password123",
                "role": "",
                "customer_id": ""
            }
        }


class CreateUserResponse(BaseModel):
    email: str

    class Config:
        json_schema_extra = {
            "example": {
                "fullname": "John Doe",
                "email": "john.doe@example.com",
            }
        }


class UserResponse(BaseModel):
    name: str
    email: str


class UserInDB(BaseModel):
    id: str
    name: str
    hashed_password: str
    email: str
    role: str
    image: Optional[str] = None
    customer_id: Optional[str] = None
    connected_account_id: Optional[str] = None
    followers: Optional[list] = Field(default=[])


class UserDetails(BaseModel):
    id: str
    name: str
    email: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    role: str
    image: Optional[str] = None
    customer_id: Optional[str] = None
    connected_account_id: Optional[str] = None


class GoogleUser(BaseModel):
    sub: int
    email: str
    name: str
    picture: str


class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str


class RefreshTokenRequest(BaseModel):
    refresh_token: str


class AffiliateLink(BaseModel):
    user_id: Optional[str] = None
    affiliate_id: Optional[str] = None
    link: Optional[str] = None


class Click(BaseModel):
    affiliate_id: str
    timestamp: datetime
    user_agent: str
    ip_address: str


class Transaction(BaseModel):
    user_id: str
    amount: float
    timestamp: str


class AffliateUser(BaseModel):
    user_id: str
    emial: str = EmailStr


class Community_Post(BaseModel):
    post_id: str
    creator_user_id: str
    shared_by_user_ids: Optional[list] = []
    post_title: str
    image_url: Optional[str] = None
    video_url: Optional[str] = None
    duration_days: Optional[int] = None
    likes: list = []
    comments: list = []
    created_at: datetime = datetime.utcnow()

    class Config:
        orm_mode = True


class Comment(BaseModel):
    user_id: str
    text: str
    created_at: datetime = datetime.utcnow()

    class Config:
        orm_mode = True


class SharedBy(BaseModel):
    user_id: str
    shared_at: datetime = datetime.utcnow()

    class Config:
        orm_mode = True
