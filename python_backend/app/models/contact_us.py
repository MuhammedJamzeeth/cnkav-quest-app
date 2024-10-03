from typing import Literal

from pydantic import BaseModel, Field


class ContactUs(BaseModel):
    name: str = Field(...)
    email: str = Field(...)
    gender: str = Field(...)
    marital: str = Field(...)
    employed: str = Field(...)
    product: str = Field(...)
    where_you_from: str = Field(...)
    religion: str = Field(...)
    capital: str = Field(...)
    similar_product: str = Field(...)
    hardest_product: str = Field(...)
    survey: str = Field(...)
    motivator: str = Field(...)
    previously: str = Field(...)
    current_solution: str = Field(...)
