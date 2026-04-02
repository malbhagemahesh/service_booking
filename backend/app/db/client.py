from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

async def get_db_client():
    client = AsyncIOMotorClient(settings.mongo_uri)
    return client.service_booking  # db name

# Helper to get collection
def get_collection(db, name: str):
    return db[name]

