import time

import requests
from fastapi import APIRouter, HTTPException
from jose import jwt
from pydantic import BaseModel
from loguru import logger

router = APIRouter(
    prefix='/zoom',
    tags=['Zoom Management']
)

# Replace with your Server-to-Server OAuth credentials from Zoom
SDK_KEY = 'FVpUA86LSUGIbFA8tyZ7EQ'
SDK_SECRET = 'CbqSpsR5zNTDYrCbdVs6PHGgMYK4adOn'
USER_ID = '124'


class Meeting(BaseModel):
    topic: str
    id: str


class MeetingsResponse(BaseModel):
    meetings: list[Meeting]


class JWTRequest(BaseModel):
    meetingNumber: str
    role: int


@router.post("/generate_signature/")
def generate_signature(request: JWTRequest):
    logger.info(request.dict())
    try:
        iat = int(time.time()) - 30
        exp = iat + 60 * 60 * 2  # Token expiration time (2 hours)
        payload = {
            'appKey': SDK_KEY,  # Changed from app_key to sdk_key
            'sdkKey': SDK_KEY,
            'meetingNumber': request.meetingNumber,  # Changed from tpc to meeting_number
            'role': request.role,
            'iat': iat,
            'exp': exp,
            'tokenExp': exp
        }

        token = jwt.encode(payload, SDK_SECRET, algorithm='HS256')
        return {"signature": token}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating JWT: {str(e)}")


@router.get("/meetings/", response_model=MeetingsResponse)
def get_meetings():
    logger.info("Fetching meetings for user.")
    try:
        # Create a JWT token
        token = jwt.encode({'iss': SDK_KEY, 'exp': time.time() + 60}, SDK_SECRET, algorithm='HS256')

        headers = {
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/json'
        }

        # Make a request to the Zoom API to get meetings
        response = requests.get(f'https://api.zoom.us/v2/users/me/meetings', headers=headers)

        if response.status_code == 200:
            meetings_data = response.json().get('meetings', [])
            meetings = [Meeting(topic=meeting['topic'], id=meeting['id']) for meeting in meetings_data]
            return MeetingsResponse(meetings=meetings)
        else:
            logger.error(f"Failed to fetch meetings: {response.status_code}, {response.text}")
            raise HTTPException(status_code=response.status_code, detail=response.text)
    except Exception as e:
        logger.error(f"Error fetching meetings: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error fetching meetings: {str(e)}")
