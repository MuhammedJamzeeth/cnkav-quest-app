from bson import ObjectId
from fastapi import HTTPException
from loguru import logger
from pymongo.errors import PyMongoError
from starlette import status

from app.db.database import quest_app_collection
from app.models.quest_app import QuestApp


async def create_quest_app(quest_app_data: QuestApp, current_user_email: str):
    try:
        # Convert the QuestApp object to a dictionary and add the 'created_by' field
        quest_app_data_info = quest_app_data.dict()

        # Convert Url fields to string
        quest_app_data_info["app_url"] = str(quest_app_data.app_url)
        quest_app_data_info["app_url_redirect"] = str(quest_app_data.app_url_redirect)

        quest_app_data_info["created_by"] = current_user_email

        # Insert the document into MongoDB
        result = await quest_app_collection.insert_one(quest_app_data_info)

        if not result.inserted_id:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Quest creation failed")

    except PyMongoError as e:
        # Handle any MongoDB-related errors
        logger.error(f"MongoDB error while creating quest: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail="Database error while creating quest")

    except Exception as e:
        # Handle general errors
        logger.error(f"Unexpected error while creating quest: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to insert data")


async def get_quest_app(quest_app_id: str):
    try:
        if not ObjectId.is_valid(quest_app_id):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid Quest App ID")

        quest_app = await quest_app_collection.find_one({"_id": ObjectId(quest_app_id)})
        if quest_app is None:
            return None
        return quest_app
    except PyMongoError as e:
        logger.error(f"MongoDB error while fetching quest: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail="Database error while fetching quest")

    except Exception as e:
        # Handle general errors
        logger.error(f"Unexpected error while getting quest data: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to get data")


async def get_all_quest_apps():
    try:
        quest_apps = await quest_app_collection.find().to_list(None)
        return quest_apps
    except PyMongoError as e:
        logger.error(f"MongoDB error while fetching quests: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail="Database error while fetching quests")
    except Exception as e:
        # Handle general errors
        logger.error(f"Unexpected error while getting quest data: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to get data")


async def update_quest_app(quest_app_id: str, update_data: dict, current_user_email: str):
    try:
        if not ObjectId.is_valid(quest_app_id):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid Quest App ID")

        update_data["updated_by"] = current_user_email
        update_data["app_url"] = str(update_data.get("app_url"))
        update_data["app_url_redirect"] = str(update_data.get("app_url_redirect"))

        result = await quest_app_collection.update_one(
            {"_id": ObjectId(quest_app_id)},
            {"$set": update_data}
        )
        if result.matched_count == 0:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Quest App not found")
    except PyMongoError as e:
        logger.error(f"MongoDB error while updating quest: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail="Database error while updating quest")

    except Exception as e:
        # Handle general errors
        logger.error(f"Unexpected error while updating quest data: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to update data")


async def delete_quest_app(quest_app_id: str):
    try:
        if not ObjectId.is_valid(quest_app_id):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid Quest App ID")

        result = await quest_app_collection.delete_one({"_id": ObjectId(quest_app_id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Quest App not found")
    except PyMongoError as e:
        logger.error(f"MongoDB error while deleting quest: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail="Database error while deleting quest")
