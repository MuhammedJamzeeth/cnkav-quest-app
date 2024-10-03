from pydantic import BaseModel, ConfigDict


class LoginRequest(BaseModel):
    email: str
    password: str
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_schema_extra={
            "example": {
                "email": "example@gmail.com",
                "password": "example123"
            }
        }
    )


class TokenResponse(BaseModel):
    access_token: str
    token_type: str
