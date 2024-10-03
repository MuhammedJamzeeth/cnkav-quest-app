from pydantic import BaseModel, Field


class Chat(BaseModel):
    sender_email: str = Field(...)
    receiver_email: str = Field(...)
    content: str = Field(...)
    timestamp: str = Field(...)
