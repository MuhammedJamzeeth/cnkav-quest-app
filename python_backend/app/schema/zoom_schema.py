from pydantic import BaseModel


class SignatureRequest(BaseModel):
    meeting_number: str
    role: int  # 0 for participant, 1 for host
