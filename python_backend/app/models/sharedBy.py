from typing import Optional, List, Dict
from pydantic import BaseModel, Field
from datetime import datetime

class SharedBy(BaseModel):
    user_id: str = Field(..., description="ID of the user who shared the post")
    shared_at: datetime = Field(default_factory=datetime.utcnow, description="Timestamp when the post was shared")

    class Config:
        orm_mode = True 
