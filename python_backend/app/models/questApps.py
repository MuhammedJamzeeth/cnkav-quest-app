from typing import Optional

from pydantic import BaseModel, Field


class QuestApps(BaseModel):
    name: str = Field(...)
    app_description: str = Field(...)
    category: str = Field(...)
    style: str = Field(...)
    price: float = Field(...)
    active: bool = Field(...)
    approved: bool = Field(...)
    emergency_contact_nummer: bool = Field(...)


