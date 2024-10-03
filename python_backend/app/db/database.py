import logging
import os

from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from gridfs import GridFS

logger = logging.getLogger(__name__)

load_dotenv()

MONGO_URL = os.getenv('MONGO_URL')

# Create a new client and connect to the server
client = AsyncIOMotorClient(MONGO_URL)

# Create synchronous client
sync_client = MongoClient(MONGO_URL)

# Synchronous DB and collections (for GridFS)
sync_db = sync_client["cnkav_database"]
fs = GridFS(sync_db)

# DB Collections
db = client["cnkav_database"]
user_collection = db["user"]
links_collection = db["links"]
clicks_collection = db["clicks"]
conversions_collection = db["conversions"]
affiliate_user = db["affliate_user"]
quest_collection = db["quest"]
post_collection = db["community_post"]
products_request = db["products_request"]
event_collection = db["event"]
shipping_address_collection = db["shipping_address"]
contact_us_collection = db["contact_us"]
chat_collection = db["chat"]
newsletter_collection = db["newsletter"]
comment_collection = db["comment"]
SharedBy_collection = db["SharedBy"]
quest_app_collection = db["QuestApp"]
ticket_app_collection = db["Tickets"]
affiliate_links_collection = db["affiliate_links_collection"]
sales_collection=db["sales_collection"]
click_collection = db["click_collection"]
database = client.cnkav


async def check_mongo_connection():
    try:
        await database.command("ismaster")
        logger.info("MongoDB is connected")
    except ConnectionFailure:
        logger.info("MongoDB is not connected")

# Function to get GridFS instance (synchronous)
def get_gridfs():
    return fs

# Function to get async database instance
def get_async_db():
    return async_db