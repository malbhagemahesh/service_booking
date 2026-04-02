from typing import List, Optional

from app.schemas import ServiceCreate, Service
from app.db.client import get_collection

async def create_service(db, service_create: ServiceCreate, provider_id: str) -> Service:
    collection = get_collection(db, "services")
    service_dict = service_create.model_dump()
    service_dict["provider_id"] = provider_id
    result = await collection.insert_one(service_dict)
    service_dict["id"] = str(result.inserted_id)
    return Service(**service_dict)

async def get_services(db, skip: int = 0, limit: int = 100) -> List[Service]:
    collection = get_collection(db, "services")
    cursor = collection.find().skip(skip).limit(limit)
    services = []
    async for doc in cursor:
        doc["id"] = str(doc["_id"])
        doc.pop("_id")
        services.append(Service(**doc))
    return services

async def get_service(db, service_id: str) -> Optional[Service]:
    collection = get_collection(db, "services")
    doc = await collection.find_one({"_id": service_id})
    if doc:
        doc["id"] = str(doc["_id"])
        doc.pop("_id")
        return Service(**doc)
    return None

async def update_service(db, service_id: str, service_update: dict) -> bool:
    collection = get_collection(db, "services")
    result = await collection.update_one({"_id": service_id}, {"$set": service_update})
    return result.modified_count > 0

async def delete_service(db, service_id: str) -> bool:
    collection = get_collection(db, "services")
    result = await collection.delete_one({"_id": service_id})
    return result.deleted_count > 0

