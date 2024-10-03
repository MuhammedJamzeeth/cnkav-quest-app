import logging
from typing import Optional

from bson import ObjectId
from fastapi import HTTPException
from starlette import status
from app.db.database import quest_collection

from app.models.quest import Quest, DateAndTime
from app.schema.quest_schema import EditQuestRequest

logger = logging.getLogger(__name__)


async def create_quest(quest_data: Quest, current_user_email: str):
    """
      Creates a new quest in the database with the provided quest data and the current user's email.

      Args:
          quest_data (Quest): The data for the new quest.
          current_user_email (str): The email of the current user creating the quest.

      Returns:
          Quest: The created quest object.

      Raises:
          HTTPException: If there is an error inserting the data.
      """
    try:
        quest_data_info = quest_data.dict()
        quest_data_info["created_by"] = current_user_email
        quest_data_info["status"] = "Pending"
        quest_data_info["confirm_quest"] = []

        result = await quest_collection.insert_one(quest_data_info)
        inserted_quest = await quest_collection.find_one({"_id": result.inserted_id}, )

        return Quest(**inserted_quest)
    except Exception as e:
        logger.error("Failed to create quest: %s", e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to insert data")


async def get_all_quests(current_user_email: str, page: int, page_size: int):
    """
       Retrieves all quests created by the current user.

       Args:
           current_user_email (str): The email of the current user.
           page (int):
           page_size (int):

       Returns:
           list: A list of quests created by the user.

       Raises:
           HTTPException: If there is an error fetching the quests or if no quests are found.
       """
    skip = (page - 1) * page_size
    try:
        quests = await quest_collection.find().skip(skip).limit(page_size).to_list(
            length=page_size)
        if not quests:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Quest not found for current user")
        for quest in quests:
            quest["_id"] = str(quest["_id"])
        return quests
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error("Failed to fetch quests: %s", e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to fetch all data")


async def update_quest(quest_id: str, quest_info: Quest, current_user_email: str, ):
    """
        Updates an existing quest with the provided information.

        Args:
            quest_id (str): The ID of the quest to update.
            quest_info (EditQuestRequest): The updated quest information.
            current_user_email (str): The email of the current user.

        Returns:
            ObjectId: The ID of the updated quest, or raises an exception if no updates were made.

        Raises:
            HTTPException: If the quest is not found, or if no quest was modified.
        """
    try:
        update_data = {k: v for k, v in quest_info.dict().items() if v is not None}

        existing_quest = await quest_collection.find_one(
            {"_id": ObjectId(quest_id), "created_by": current_user_email}
        )
        if existing_quest is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Quest data not found")

        result = await quest_collection.update_one(
            {"_id": ObjectId(quest_id), "created_by": current_user_email},
            {"$set": update_data}
        )
        if result.modified_count == 1:
            return str(result.upserted_id)
        else:
            raise HTTPException(status_code=status.HTTP_204_NO_CONTENT, detail="No quest modified")

    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error("Failed to update quest: %s", e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update data"
        )


async def update_quest_status(quest_id: str, quest_status: str, user_email: str, current_user_email: str, ):
    """
        Updates an existing quest with the provided information.

        Args:
            quest_id (str): The ID of the quest to update.
            quest_status (str): The updated status of the quest.
            current_user_email (str): The email of the current user.
            user_email

        Returns:
            str: The ID of the updated quest, or raises an exception if no updates were made.

        Raises:
            HTTPException: If the quest is not found, or if no quest was modified.
        """
    try:
        existing_quest = await quest_collection.find_one(
            {"_id": ObjectId(quest_id), "created_by": current_user_email}
        )
        if existing_quest is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Quest data not found")

        result1 = await quest_collection.update_one(
            {"_id": ObjectId(quest_id), "created_by": current_user_email},
            {"$set": {"status": quest_status}}
        )

        # Update the status inside confirm_quest for a specific user
        result2 = await quest_collection.update_one(
            {"_id": ObjectId(quest_id), "confirm_quest.user_name": user_email},
            {"$set": {"confirm_quest.$.status": quest_status}}
        )

        if result1.modified_count == 1 and result2.modified_count == 1:
            return str(result1.upserted_id)
        else:
            raise HTTPException(status_code=status.HTTP_204_NO_CONTENT, detail="No quest modified")

    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error("Failed to update quest: %s", e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update data"
        )


async def confirm_quest(quest_id: str, time: str, current_user_email: str, ):
    try:
        # Check if quest exists
        existing_quest = await quest_collection.find_one(
            {"_id": ObjectId(quest_id)}
        )
        if existing_quest is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Quest data not found")

        # Check if user has already confirmed the quest with the same time
        existing_confirmation = await quest_collection.find_one({
            "_id": ObjectId(quest_id),
            "confirm_quest": {
                "$elemMatch": {
                    "user_name": current_user_email,
                    "time": time,
                }
            }
        })
        if existing_confirmation:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="User has already confirmed this quest at this time"
            )

        result = await quest_collection.update_one(
            {"_id": ObjectId(quest_id)},
            {"$push": {"confirm_quest": {"user_name": current_user_email, "time": time, "status": "Pending"}}}
        )
        if result.modified_count == 1:
            return str(result.upserted_id)
        else:
            raise HTTPException(status_code=status.HTTP_204_NO_CONTENT, detail="No quest modified")

    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error("Failed to update quest: %s", e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update data"
        )


async def delete_quest(quest_id: str, current_user_email: str):
    """
        Deletes a quest based on the ID and user email.

        Args:
            quest_id (str): The ID of the quest to delete.
            current_user_email (str): The email of the current user.

        Returns:
            result: The result of the delete operation.

        Raises:
            HTTPException: If the quest is not found or the user is not authorized to delete it.
        """
    try:
        result = await quest_collection.delete_one({"_id": ObjectId(quest_id), "created_by": current_user_email})
        if result.deleted_count == 1:
            return result
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                detail="Quest not found or not authorized to delete")
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error("Failed to delete quest: %s", e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Fail to delete quest")


async def get_quest_by_id(quest_id: str):
    try:
        result = await quest_collection.find_one({"_id": ObjectId(quest_id)})
        if result:
            result['_id'] = str(result['_id'])
            return result
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                detail="Quest not found")
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error("Failed to get quest: %s", e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Fail to get quest")


# Function to check if date_and_time fields are non-empty
def is_date_and_time_empty(date_and_time: dict) -> bool:
    if not date_and_time:
        return True
    # Check for empty start_date, end_date, and time slots
    if not date_and_time.get("date", {}).get("start_date") or not date_and_time.get("date", {}).get("end_date"):
        return True
    for time_slot in date_and_time.get("time_slots", []):
        if not time_slot.get("startTime") or not time_slot.get("endTime") or not time_slot.get("status"):
            return True
    return False


async def book_quest(quest_id: str, index: int, date_and_time: Optional[DateAndTime]):
    try:
        date_and_time_dict = None
        if date_and_time:
            # Ensure that date_and_time has actual content and is not empty
            date_and_time_dict = date_and_time.dict()
            if is_date_and_time_empty(date_and_time_dict):
                date_and_time_dict = None

        existing_quest = await quest_collection.find_one(
            {"_id": ObjectId(quest_id)}
        )
        if existing_quest is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Quest data not found")

        result_confirmed = await quest_collection.update_one(
            {"_id": ObjectId(quest_id)},
            {"$set": {f"date_and_time.0.time_slots.{index}.status": "Confirmed"}}
        )

        if date_and_time_dict:
            result = await quest_collection.update_one({"_id": ObjectId(quest_id)},
                                                       {"$push": {"date_and_time": date_and_time_dict}}
                                                       )

        if result_confirmed.modified_count == 1:
            return str(result_confirmed.upserted_id)
        else:
            raise HTTPException(status_code=status.HTTP_204_NO_CONTENT, detail="No quest modified")

    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error("Failed to update quest: %s", e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update data"
        )
