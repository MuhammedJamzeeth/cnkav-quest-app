from fastapi import APIRouter, Query, status, HTTPException
from app.models.event import Event
from app.service.event_service import create_event, read_event_by_id, get_all_events_for_user, update_event, \
    delete_event , get_all_events
from app.utils.jwt import user_dependency
from app.service.event_service import get_purchased_events
from app.models.event import Event

from app.service.event_service import fetch_user_created_and_purchased_events
router = APIRouter(
    prefix='/event',
    tags=['Event Management']
)


from fastapi import APIRouter, Query, status, HTTPException
from app.models.event import Event
from app.service.event_service import create_event, read_event_by_id, get_all_events_for_user, update_event, \
    delete_event
from app.utils.jwt import user_dependency



@router.post("/create", response_description="Add a new event", status_code=status.HTTP_201_CREATED)
async def create(event_info: Event, user: user_dependency):
    """
        Creates a new event for an authenticated user.

        Args:
            event_info (Event): The details of the event to be created.
            user (user_dependency): The authenticated user.

        Returns:
            Event: The created event with the status code 201 Created.

        Raises:
            HTTPException: If the user is not authenticated.
    """
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication failed")
    return await create_event(user.get('email'), event_info)


@router.get("/all", response_description="Get all events for a user", status_code=status.HTTP_200_OK)
async def get_all_events_for_user_route(
        user: user_dependency,
        skip: int = Query(0, description="Number of records to skip"),
        limit: int = Query(10, description="Maximum number of records to return")
):
    """
        Retrieves all events for the authenticated user with optional pagination.

        Args:
            user (user_dependency): The authenticated user.
            skip (int, optional): Number of records to skip (default is 0).
            limit (int, optional): Maximum number of records to return (default is 10).

        Returns:
            List[Event]: A list of events with the status code 200 OK.

        Raises:
            HTTPException: If the user is not authenticated.
    """
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication failed")
    return await get_all_events( skip, limit)



@router.get("/read/{event_id}", response_description="Read an existing event", status_code=status.HTTP_200_OK)
async def read_event(event_id: str, user: user_dependency):
    """
        Retrieves an existing event by its ID for an authenticated user.

        Args:
            event_id (str): The ID of the event to retrieve.
            user (user_dependency): The authenticated user.

        Returns:
            Event: The requested event with the status code 200 OK.

        Raises:
            HTTPException: If the user is not authenticated or if the event does not exist.
    """
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication failed")
    return await read_event_by_id(user.get('email'), event_id)


@router.get("/user/all", response_description="Get all events of a user", status_code=status.HTTP_200_OK)
async def get_all_events_for_user_route(
        user: user_dependency,
        skip: int = Query(0, description="Number of records to skip"),
        limit: int = Query(10, description="Maximum number of records to return")
):
    """
        Retrieves all events for the authenticated user with optional pagination.

        Args:
            user (user_dependency): The authenticated user.
            skip (int, optional): Number of records to skip (default is 0).
            limit (int, optional): Maximum number of records to return (default is 10).

        Returns:
            List[Event]: A list of events with the status code 200 OK.

        Raises:
            HTTPException: If the user is not authenticated.
    """
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication failed")
    return await get_all_events_for_user(user.get('email'), skip, limit)


@router.delete("/delete/{event_id}", response_description="Delete an event", status_code=status.HTTP_200_OK)
async def delete_event_route(event_id: str, user: user_dependency):
    """
        Deletes an event by its ID for an authenticated user.

        Args:
            event_id (str): The ID of the event to delete.
            user (user_dependency): The authenticated user.

        Returns:
            JSONResponse: A confirmation message with the status code 200 OK.

        Raises:
            HTTPException: If the user is not authenticated or if the event does not exist.
    """
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication failed")
    return await delete_event(user.get('email'), event_id)


@router.put("/update/{event_id}", response_description="Update an event", status_code=status.HTTP_200_OK)
async def update_event_route(event_id: str, event_info: Event,
                             user: user_dependency):
    """
       Updates an existing event by its ID for an authenticated user.

       Args:
           event_id (str): The ID of the event to update.
           event_info (Event): The updated details of the event.
           user (user_dependency): The authenticated user.

       Returns:
           Event: The updated event with the status code 200 OK.

       Raises:
           HTTPException: If the user is not authenticated or if the event does not exist.
       """
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication failed")
    return await update_event(user.get('email'), event_id, event_info)

@router.get("/read/{event_id}", response_description="Read an existing event", status_code=status.HTTP_200_OK)
async def read_event(event_id: str, user: user_dependency):
    """
        Retrieves an existing event by its ID for an authenticated user.

        Args:
            event_id (str): The ID of the event to retrieve.
            user (user_dependency): The authenticated user.

        Returns:
            Event: The requested event with the status code 200 OK.

        Raises:
            HTTPException: If the user is not authenticated or if the event does not exist.
    """
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication failed")
    return await read_event_by_id(user.get('email'), event_id)




@router.delete("/delete/{event_id}", response_description="Delete an event", status_code=status.HTTP_200_OK)
async def delete_event_route(event_id: str, user: user_dependency):
    """
        Deletes an event by its ID for an authenticated user.

        Args:
            event_id (str): The ID of the event to delete.
            user (user_dependency): The authenticated user.

        Returns:
            JSONResponse: A confirmation message with the status code 200 OK.

        Raises:
            HTTPException: If the user is not authenticated or if the event does not exist.
    """
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication failed")
    return await delete_event(user.get('email'), event_id)


@router.put("/update/{event_id}", response_description="Update an event", status_code=status.HTTP_200_OK)
async def update_event_route(event_id: str, event_info: Event,
                             user: user_dependency):
    """
       Updates an existing event by its ID for an authenticated user.

       Args:
           event_id (str): The ID of the event to update.
           event_info (Event): The updated details of the event.
           user (user_dependency): The authenticated user.

       Returns:
           Event: The updated event with the status code 200 OK.

       Raises:
           HTTPException: If the user is not authenticated or if the event does not exist.
       """
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication failed")
    return await update_event(user.get('email'), event_id, event_info)




@router.get("/user/{email}/purchased-events",  response_description="Get all purchased events", status_code=status.HTTP_200_OK)

async def purchased_events(email: str, skip: int = 0, limit: int = 10):
    """
    Get events that the user has purchased tickets for.
    
    Args:
        user_id (str): The user's ID.
        skip (int): Number of events to skip for pagination.
        limit (int): Maximum number of events to return.

    Returns:
        List[Event]: List of events that the user has purchased tickets for.
    """
    try:
        events = await get_purchased_events(email, skip, limit)
        
        # Ensure events are returned as a list of dictionaries, converting any ObjectId to strings
        for event in events:
            event["_id"] = str(event["_id"])  # Ensure the event IDs are returned as strings
        
        return events
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving purchased events: {e}")