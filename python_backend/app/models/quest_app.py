from typing import Optional, Annotated

from pydantic import BaseModel, Field, HttpUrl, BeforeValidator

PyObjectId = Annotated[str, BeforeValidator(str)]


class QuestApp(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    title: str
    details: str
    category: str
    api_key: str
    api_key_secret: str
    app_type: str
    app_url: HttpUrl
    app_url_redirect: HttpUrl
    quest_style: str
    price: float = Field(gt=0)  # Price must be greater than 0
    image: Optional[str]


class QuestAppUpdate(BaseModel):
    title: Optional[str]
    details: Optional[str]
    category: Optional[str]
    api_key: Optional[str]
    api_key_secret: Optional[str]
    app_type: Optional[str]
    app_url: Optional[HttpUrl]
    app_url_redirect: Optional[HttpUrl]
    quest_style: Optional[str]
    price: Optional[float] = Field(gt=0)  # Price must be greater than 0
    image: Optional[str]
