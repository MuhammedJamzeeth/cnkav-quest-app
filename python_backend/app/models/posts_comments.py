from typing import Optional, List
from pydantic import BaseModel, Field
from datetime import datetime

class Comment(BaseModel):
    user_id: str = Field(..., description="ID of the user who commented")
    text: str = Field(..., description="Comment text")
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        orm_mode = True