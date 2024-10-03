from typing import Optional

from pydantic import BaseModel


class EditQuestRequest(BaseModel):
    title: Optional[str]
    task_details: Optional[str]
    duration_days: Optional[int]
    category: Optional[str]
    rank: Optional[str]
    style: Optional[str]
    price: Optional[float]
    book_availability_date: Optional[str]
    book_availability_time: Optional[str]
