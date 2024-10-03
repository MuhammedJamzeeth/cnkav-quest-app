from typing import Dict

from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends, HTTPException, Query
from starlette import status

from app.models.chat import Chat
from app.service.chat_service import get_messages_by_sender_and_receiver
from app.utils.jwt import user_dependency
from app.utils.websocket import ConnectionManager

# Creating a router for chat-related routes
router = APIRouter(
    prefix='',
    tags=['Chat Management']
)

# Initialize the WebSocket connection manager
manager = ConnectionManager()


# # Route for sending a message
# @router.post("/send", response_description="Send a message", status_code=status.HTTP_200_OK)
# async def send_message_route(message_data: Message, current_user_email: str = Depends(get_current_user)):
#     # Call the service to send the message
#     await send_message(message_data, current_user_email)
#
#     # Notify the receiver via WebSocket
#     await manager.send_personal_message(f"New message from {current_user_email}", message_data.receiver_email)
#
#     # Return a success message
#     return {"msg": "Message sent successfully"}
#
#
# Route for retrieving messages between two users
@router.get("/messages/{receiver_email}", response_description="Get messages between two users",
            status_code=status.HTTP_200_OK)
async def get_messages_route(receiver_email: str, user: user_dependency, page: int = Query(1, alias="page"),
                             page_size: int = Query(10, alias="page_size")):
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication failed")
    # Call the service to get messages
    return await get_messages_by_sender_and_receiver(user.get('email'), receiver_email, page, page_size)


#
# # Route for getting the count of unread messages
# @router.get("/unread_count", response_description="Get unread message count", status_code=status.HTTP_200_OK)
# async def get_unread_message_count_route(current_user_email: str = Depends(get_current_user)):
#     # Call the service to get unread message count
#     return await get_unread_message_count(current_user_email)
#
#
# # Route for marking messages as read
# @router.post("/mark_as_read", response_description="Mark messages as read", status_code=status.HTTP_200_OK)
# async def mark_messages_as_read_route(receiver_email: str, current_user_email: str = Depends(get_current_user)):
#     # Call the service to mark messages as read
#     await mark_messages_as_read(current_user_email, receiver_email)
#
#     # Return a success message
#     return {"msg": "Messages marked as read"}

online_users: Dict[str, str] = {}


# WebSocket endpoint for real-time communication
# @router.websocket("/ws")
# async def websocket_endpoint(websocket: WebSocket, user: user_dependency):
#     if user is None:
#         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication failed")
#     # Connect the WebSocket to the connection manager
#     user_email = user.get('email')
#     await manager.connect(websocket, user_email)
#     online_users[user_email] = websocket.client.host
#     try:
#         while True:
#             # Receive messages from the WebSocket
#             data = await websocket.receive_text()
#
#             # Call the service to save the message
#             await send_message(data, user_email)
#
#             # Broadcast the received message to all connected clients
#             await manager.send_personal_message(user_email, data)
#     except WebSocketDisconnect:
#         # Handle disconnection and notify other clients
#         manager.disconnect(user_email)
#         await manager.broadcast(f"User {user_email} left the chat")
#


@router.get('/online-users')
async def get_online_users():
    return list(online_users.keys())
