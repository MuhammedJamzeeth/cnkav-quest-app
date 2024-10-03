from pydantic import BaseModel, Field

from datetime import datetime
from pydantic import Field
from typing import Optional

class Ticket(BaseModel):
    event_id: str = Field(..., description="The event this ticket is for")
    user_id: str = Field(..., description="The user who purchased the ticket")
    purchase_date: datetime = Field(default_factory=datetime.utcnow, description="Date when the ticket was purchased")
    price: float = Field(..., description="Price of the ticket")
    payment_method: str = Field(..., description="Payment method used for the ticket (e.g., 'regular' or 'crypto')")
    status: str = Field(..., description="Status of the ticket purchase (e.g., 'confirmed', 'pending')")
    ticket_code: Optional[str] = Field(None, description="Unique code for the ticket (e.g., for scanning or verification)")