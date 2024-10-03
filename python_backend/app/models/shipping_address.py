from typing import Optional

from pydantic import BaseModel, Field


class ShippingAddress(BaseModel):
    full_name: str = Field(...)
    company_name: Optional[str] = Field(...)
    country_region: str = Field(...)
    street_address: str = Field(...)
    postcode: str = Field(...)
    town_city: str = Field(...)
    phone: str = Field(...)
