import shutil
from pathlib import Path
from typing import List

from fastapi import APIRouter, HTTPException, UploadFile, File
from starlette import status
from starlette.responses import JSONResponse

from app.models.quest_app import QuestApp, QuestAppUpdate
from app.service.quest_app_service import create_quest_app, get_quest_app, get_all_quest_apps, update_quest_app, \
    delete_quest_app
from app.utils.jwt import user_dependency

router = APIRouter(
    prefix='/quest_app',
    tags=['Quest App Management']
)

UPLOAD_DIR = Path("uploads/images")

# Create the upload directory if it doesn't exist
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


@router.post('/create', status_code=status.HTTP_201_CREATED, response_description="Quest App created successfully")
async def create(quest_app_data: QuestApp, user: user_dependency):
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication failed")
    await create_quest_app(quest_app_data, user.get("email"))
    return JSONResponse(content={"message": "Quest App created successfully"},
                        status_code=status.HTTP_201_CREATED)


@router.get('/{quest_app_id}', response_model=QuestApp, response_description="Quest App retrieved successfully")
async def get(quest_app_id: str):
    quest_app = await get_quest_app(quest_app_id)
    if not quest_app:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Quest App not found")
    return quest_app


@router.get('/', response_model=List[QuestApp], response_description="List of Quest Apps")
async def get_all():
    return await get_all_quest_apps()


@router.put('/{quest_app_id}', response_description="Quest App updated successfully")
async def update(quest_app_id: str, quest_app_data: QuestAppUpdate, user: user_dependency):
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication failed")
    await update_quest_app(quest_app_id, quest_app_data.dict(exclude_unset=True), user.get("email"))
    return JSONResponse(content={"message": "Quest App updated successfully"}, status_code=status.HTTP_200_OK)


@router.delete('/{quest_app_id}', status_code=status.HTTP_204_NO_CONTENT,
               response_description="Quest App deleted successfully")
async def delete(quest_app_id: str, user: user_dependency):
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication failed")
    await delete_quest_app(quest_app_id)
    return JSONResponse(content={"message": "Quest App deleted successfully"}, status_code=status.HTTP_204_NO_CONTENT)


@router.post('/upload-image', status_code=status.HTTP_201_CREATED)
async def upload_image(file: UploadFile = File(...)):
    if file.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Invalid file type. Only JPEG and PNG files are allowed.")

    file_path = UPLOAD_DIR / file.filename
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return JSONResponse(content={"image_url": f"/uploads/images/{file.filename}"}, status_code=status.HTTP_201_CREATED)
