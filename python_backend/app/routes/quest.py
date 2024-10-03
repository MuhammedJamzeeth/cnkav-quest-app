from typing import Optional

from fastapi import APIRouter, HTTPException, Query
from starlette import status

from app.schema.quest_schema import EditQuestRequest
from app.service.quest_service import create_quest, update_quest, delete_quest, get_all_quests, get_quest_by_id, \
    update_quest_status, confirm_quest, book_quest
from fastapi.responses import JSONResponse
from app.models.quest import Quest, DateAndTime
from app.utils.jwt import user_dependency

router = APIRouter(
    prefix='/quest',
    tags=['quest Management']
)


@router.post('/create', status_code=status.HTTP_201_CREATED)
async def create(quest_data: Quest, user: user_dependency):
    """
        Creates a new quest for the authenticated user.

        Args:
            quest_data (Quest): The data required to create a new quest.
            user (user_dependency): The authenticated user.

        Returns:
            JSONResponse: Confirmation message and newly created quest data.

        Raises:
            HTTPException: If the user is not authenticated.
    """
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication failed")
    result = await create_quest(quest_data, user.get("email"))
    return JSONResponse(content={"message": "Quest created successfully", "new_quest": result.dict()},
                        status_code=status.HTTP_201_CREATED)


@router.get('/all', response_description="Get all quests for a user", status_code=status.HTTP_200_OK)
async def get_all(user: user_dependency, page: int = Query(1, alias="page"),
                  page_size: int = Query(10, alias="page_size")):
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication failed")
    return await get_all_quests(user.get("email"), page, page_size)


@router.put('/{quest_id}', response_description="Update a quest", status_code=status.HTTP_200_OK)
async def update(quest_id: str, quest_data: Quest, user: user_dependency):
    """
        Updates an existing quest for the authenticated user.

        Args:
            quest_id (str): The ID of the quest to be updated.
            quest_data (EditQuestRequest): The updated quest data.
            user (user_dependency): The authenticated user.

        Returns:
            JSONResponse: Confirmation message and updated quest ID.

        Raises:
            HTTPException: If the user is not authenticated
     """
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication failed")
    result = await update_quest(quest_id, quest_data, user.get("email"))
    return JSONResponse(content={"message": "Quest update successfully", "updated_quest_id": result},
                        status_code=status.HTTP_200_OK)


@router.put('/update/{quest_id}', response_description="Update quest status", status_code=status.HTTP_200_OK)
async def update_status(user: user_dependency, quest_id: str, status_q: str = Query(alias="status"),
                        user_email: str = Query(alias="userEmail")):
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication failed")
    result = await update_quest_status(quest_id, status_q, user_email, user.get("email"))
    return JSONResponse(content={"message": "Quest update successfully", "updated_quest_id": result},
                        status_code=status.HTTP_200_OK)


@router.put('/confirm/{quest_id}', response_description="Update quest status", status_code=status.HTTP_200_OK)
async def confirm(user: user_dependency, quest_id: str, time: str = Query(alias="time")):
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication failed")
    result = await confirm_quest(quest_id, time, user.get("email"))
    return JSONResponse(content={"message": "Quest update successfully", "updated_quest_id": result},
                        status_code=status.HTTP_200_OK)


@router.delete('/delete/{quest_id}', response_description="Delete a quest", status_code=status.HTTP_200_OK)
async def delete(quest_id: str, user: user_dependency):
    """
       Deletes a quest for the authenticated user.

       Args:
           quest_id (str): The ID of the quest to be deleted.
           user (user_dependency): The authenticated user.

       Returns:
           JSONResponse: Confirmation message if the quest was successfully deleted.

       Raises:
           HTTPException: If the user is not authenticated.
    """
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication failed")
    result = await delete_quest(quest_id, user.get("email"))
    if result:
        return JSONResponse(content={"message": "Quest deleted successfully"}, status_code=status.HTTP_200_OK)


@router.get("/{quest_id}", status_code=status.HTTP_200_OK)
async def get_by_id(quest_id: str, user: user_dependency):
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication failed")
    return await get_quest_by_id(quest_id)


@router.put("/book/{quest_id}", status_code=status.HTTP_200_OK)
async def book_meeting(user: user_dependency, quest_id, date_time: Optional[DateAndTime] = None,
                       index: int = Query(alias="index"), ):
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication failed")
    await book_quest(quest_id, index, date_time)
