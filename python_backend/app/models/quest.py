from typing import Optional, List

from pydantic import BaseModel, Field


class TimeSlot(BaseModel):
    startTime: str
    endTime: str
    status: str


class DateSlot(BaseModel):
    start_date: str
    end_date: str


class DateAndTime(BaseModel):
    date: DateSlot
    time_slots: List[TimeSlot]


class ConfirmedQuest(BaseModel):
    user_name: str
    time: str
    status: str


class Quest(BaseModel):
    title: str = Field(...)
    task_details: str = Field(...)
    duration_days: str = Field(...)
    category: str = Field(...)
    rank: str = Field(...)
    style: str = Field(...)
    price: float = Field(...)
    date_and_time: List[DateAndTime] = Field(...)
    confirm_quest: Optional[List[ConfirmedQuest]] = None
