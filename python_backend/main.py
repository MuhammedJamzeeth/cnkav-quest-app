import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.websockets import WebSocket, WebSocketDisconnect

from app.db.database import check_mongo_connection
from app.models.chat import Chat
from app.routes.user import router as user_router
from app.routes.auth import router as auth_router
from app.routes.crypto import router as crypto_router
from app.routes.quest import router as quest_router
from app.routes.community import router as community_router
from app.routes.shipping_address import router as address_router
from app.routes.event import router as event_router
from app.routes.contact_us import router as contact_us_router
from app.routes.chat import router as chat_router
from app.routes.password_reset import router as reset_router
from app.routes.newsletter import router as newsletter_router
from app.routes.ticket_router import router as ticket_router
from app.routes.quest_app import router as app_router
from app.routes.zoom import router as zoom_router
from app.routes.product_request import router as product_router
from app.routes.affiliate import router as affliate_router

from dotenv import load_dotenv
import logging
import os
from starlette.middleware.sessions import SessionMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path
from app.service.chat_service import save_message
from app.utils.websocket import ConnectionManager

load_dotenv()

# Retrieve SECRET_KEY from environment variables
SECRET_KEY = os.getenv("SECRET_KEY")

# Ensure SECRET_KEY is set for session management
if SECRET_KEY is None:
    raise ValueError("No SECRET_KEY set for SessionMiddleware. Check your .env file")

# Define allowed origins for CORS
origins = ["*"]  # Allow all origins; adjust this for production environments

# Configure logging
logging.basicConfig(level=logging.DEBUG, format="%(asctime)s - %(levelname)s: %(name)s: %(message)s")

app = FastAPI(
    title="CNKAV API",
    summary="A sample application showing how to use FastAPI to add a ReST API to a MongoDB collection.",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Adjust origins for production for better security
    allow_credentials=True,
    allow_methods=["*"],  # Adjust methods if necessary for stricter security
    allow_headers=["*"],  # Adjust headers if necessary for stricter security
)

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

# Include routers for different endpoints
routers = [
    auth_router,
    crypto_router,
    user_router,
    quest_router,
    community_router,
    address_router,
    event_router,
    contact_us_router,
    chat_router,
    reset_router,
    newsletter_router,
    ticket_router,
    app_router,
    zoom_router,
    product_router,
    affliate_router
]
for router in routers:
    app.include_router(router)

# Add Session middleware
app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY)
# Mount the 'uploads' directory to the '/uploads' route
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")
manager = ConnectionManager()


@app.websocket("/ws/{user_email}")
async def websocket_endpoint(websocket: WebSocket, user_email: str):
    await manager.connect(websocket, user_email)
    try:
        while True:
            # Receive messages from the WebSocket
            data = await websocket.receive_text()
            chat = Chat.parse_raw(data)
            chat_dict = chat.dict()
            receiver_email = chat_dict.get("receiver_email")
            print(receiver_email + "here")
            # Call the service to save the message
            await save_message(chat_dict)

            # Broadcast the received message to all connected clients
            await manager.send_personal_message(data, receiver_email)
    except WebSocketDisconnect:
        # Handle disconnection and notify other clients
        manager.disconnect(user_email)
        await manager.broadcast(f"User {user_email} left the chat")


@app.on_event("startup")
async def startup_event():
    await check_mongo_connection()


if __name__ == "__main__":
    uvicorn.run(
        app="app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
