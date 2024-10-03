from datetime import datetime
from typing import Optional, Union

from pydantic import BaseModel, Field


class Event(BaseModel):
    title: str = Field(..., description="Title of the event")
    description: str = Field(..., description="Description of the event")
    start_datetime: datetime = Field(..., description="Start date and time of the event")
    end_datetime: datetime = Field(..., description="End date and time of the event")
    location: str = Field(..., description="Location of the event")
    event_code: Optional[str] = Field(None, description="Optional event code for tracking")
    ticket_quantity: int = Field(..., description="Total number of tickets available")
    ticket_photo: Optional[str] = Field(None, description="URL to an image of the ticket")
    price: float = Field(..., description="Price per ticket")
    event_type: str = Field(..., description="Type of event: community or exclusive room")
    commission_rate: Optional[float] = Field(None, description="Commission rate applicable to the event, if any")
    createdBy: str = Field(..., description="The email of the user who created the event")
    event_type: str = Field(default="community", description="Type of event: community or exclusive room")

    class Config:
        schema_extra = {
            "example": {
                "title": "Annual Tech Conference",
                "description": "A conference about the latest in tech.",
                "start_datetime": "2023-12-01T09:00:00",
                "end_datetime": "2023-12-01T17:00:00",
                "location": "Tech Park, Silicon Valley",
                "event_code": "TECH2023",
                "ticket_quantity": 100,
                "ticket_photo": "http://example.com/ticket_photo.jpg",
                "price": 99.99,
                "event_type": "community",
                "commission_rate": 0.30,
                "createdBy": "user123"
            }
        }
