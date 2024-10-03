from fastapi import HTTPException, status
from bson import ObjectId
from starlette.responses import JSONResponse

from app.db.database import event_collection
from app.db.database import ticket_app_collection 
from app.db.database import user_collection 
from app.models.event import Event
import logging

logger = logging.getLogger(__name__)


async def create_event(current_user_email: str, event_info: Event):
    """
        Creates a new event with the provided information and associates it with the current user.

        Args:
            current_user_email (str): The email of the user creating the event.
            event_info (Event): The event data to be created.

        Returns:
            JSONResponse: A response indicating success or failure.

        Raises:
            HTTPException: If there is an error creating the event or if the event is not added.
    """
    try:
        event_data = event_info.dict()
        event_data["created_by"] = current_user_email

        result = await event_collection.insert_one(event_data)

        if result.inserted_id:
            return JSONResponse(content={"message": "Event added successfully", "event_id": str(result.inserted_id)},
                                status_code=status.HTTP_201_CREATED)

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Event not added"
        )
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error(f"Error adding event: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error while adding event"
        )


async def read_event_by_id(current_user_email: str, event_id: str):
    """
        Retrieves an event by its ID, ensuring it was created by the current user.

        Args:
            current_user_email (str): The email of the user requesting the event.
            event_id (str): The ID of the event to retrieve.

        Returns:
            dict: The event data.

        Raises:
            HTTPException: If the event is not found or if there is an error retrieving the event.
     """
    try:
        event = await event_collection.find_one({"_id": ObjectId(event_id), "created_by": current_user_email})

        if event:
            event["_id"] = str(event["_id"])  # Convert ObjectId to string
            return event

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found"
        )
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error(f"Error reading event: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error while reading event"
        )


async def get_all_events_for_user(current_user_email: str, skip: int = 0, limit: int = 10):
    """
        Retrieves all events created by the current user, with optional pagination.

        Args:
            current_user_email (str): The email of the user requesting the events.
            skip (int, optional): The number of events to skip (default is 0).
            limit (int, optional): The maximum number of events to return (default is 10).

        Returns:
            JSONResponse: A list of events with their IDs.

        Raises:
            HTTPException: If no events are found or if there is an error fetching the events.
    """
    try:
        events = await event_collection.find({"created_by": current_user_email}).skip(skip).limit(limit).to_list(
            length=None)

        if not events:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Events not found")

        for event in events:
            event["_id"] = str(event["_id"])

        return events
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error(f"Error fetching events: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error while fetching events"
        )


async def delete_event(current_user_email: str, event_id: str):
    """
       Deletes an event by its ID if it was created by the current user.

       Args:
           current_user_email (str): The email of the user requesting the deletion.
           event_id (str): The ID of the event to delete.

       Returns:
           JSONResponse: A response indicating success or failure with the event ID.

       Raises:
           HTTPException: If the event is not found or if there is an error deleting the event.
    """
    try:
        result = await event_collection.delete_one(
            {"_id": ObjectId(event_id), "created_by": current_user_email}
        )

        if result.deleted_count == 1:
            return JSONResponse(content={"message": "Event deleted successfully", "event_id": event_id},
                                status_code=status.HTTP_200_OK)

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found"
        )
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error(f"Error deleting event: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error while deleting event"
        )


async def update_event(current_user_email: str, event_id: str, event_info: Event):
    """
        Updates an existing event with new information if it was created by the current user.

        Args:
            current_user_email (str): The email of the user requesting the update.
            event_id (str): The ID of the event to update.
            event_info (Event): The updated event data.

        Returns:
            JSONResponse: A response indicating success or failure with the updated event ID.

        Raises:
            HTTPException: If the event is not found or if there is an error updating the event.
    """
    try:
        update_data = {k: v for k, v in event_info.dict().items() if v is not None}
        event = await event_collection.find_one({"_id": ObjectId(event_id), "created_by": current_user_email})
      
        result = await event_collection.update_one(
            {"_id": ObjectId(event_id), "created_by": current_user_email},
            {"$set": update_data}
        )

        if result.modified_count == 1:
            return JSONResponse(content={"message": "Event updated successfully"}, status_code=status.HTTP_200_OK)

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found"
        )
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error(f"Error updating event: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error while updating event"
        )



async def get_user_events(user_email: str, skip: int, limit: int):
    """
    Fetches events created by the user.

    Args:
        user_email (str): Email of the user.
        skip (int): Number of events to skip.
        limit (int): Maximum number of events to return.

    Returns:
        List[Event]: List of events created by the user.
    """
    return await event_collection["events"].find({"creator_email": user_email}).skip(skip).limit(limit).to_list(length=limit)



async def fetch_user_created_and_purchased_events(user_email: str, skip: int = 0, limit: int = 10):
    """Fetches events created by the user and events the user purchased tickets for."""
    # Fetch events created by the user
    created_events = await event_collection["events"].find({"createdBy": user_email}).skip(skip).limit(limit).to_list(length=limit)

    # Fetch tickets purchased by the user
    purchased_tickets = await event_collection["tickets"].find({"user_id": user_email}).to_list(length=100)

    # Extract event IDs from purchased tickets
    purchased_event_ids = [ticket["event_id"] for ticket in purchased_tickets]

    # Fetch events for purchased tickets
    purchased_events = await event_collection["events"].find({"_id": {"$in": purchased_event_ids}}).skip(skip).limit(limit).to_list(length=limit)

    # Combine created and purchased events
    all_events = created_events + purchased_events
    return all_events


async def get_all_events_for_user(current_user_email: str, skip: int = 0, limit: int = 10):
    """
        Retrieves all events created by the current user, with optional pagination.

        Args:
            current_user_email (str): The email of the user requesting the events.
            skip (int, optional): The number of events to skip (default is 0).
            limit (int, optional): The maximum number of events to return (default is 10).

        Returns:
            JSONResponse: A list of events with their IDs.

        Raises:
            HTTPException: If no events are found or if there is an error fetching the events.
    """
    try:
        events = await event_collection.find({"created_by": current_user_email}).skip(skip).limit(limit).to_list(
            length=None)

        if not events:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Events not found")

        for event in events:
            event["_id"] = str(event["_id"])

        return events
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error(f"Error fetching events: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error while fetching events"
        )






async def get_purchased_events(email: str, skip: int, limit: int):
    """
    Fetches events for which the user has purchased tickets.

    Args:
        user_email (str): Email of the user.
        skip (int): Number of events to skip.
        limit (int): Maximum number of events to return.

    Returns:
        List[Event]: List of events purchased by the user.
    """
    # Find tickets purchased by the user
    user = await user_collection.find_one({"email": email})
    user_id = str(user.get("_id"))
    user_tickets = await ticket_app_collection.find({"user_id":user_id}).to_list(length=100)
    
    # Extract event_ids from the tickets
    event_ids = [ObjectId(ticket["event_id"]) for ticket in user_tickets]
    
    # Fetch events for the purchased tickets
    return await event_collection.find({"_id": {"$in": event_ids}}).skip(skip).limit(limit).to_list(length=limit)


async def get_all_events(skip: int = 0, limit: int = 10):
    """
    Retrieves all events with optional pagination.

    Args:
        skip (int, optional): The number of events to skip (default is 0).
        limit (int, optional): The maximum number of events to return (default is 10).

    Returns:
        List[dict]: A list of events with their IDs.

    Raises:
        HTTPException: If no events are found or if there is an error fetching the events.
    """
    try:
        # Fetch all events without any filter
        events = await event_collection.find().skip(skip).limit(limit).to_list(length=None)

        if not events:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No events found")

        # Convert ObjectId to string for each event
        for event in events:
            event["_id"] = str(event["_id"])

        return events
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error(f"Error fetching events: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error while fetching events"
        )