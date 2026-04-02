from typing import List, Optional

from app.schemas import BookingCreate, Booking
from app.db.client import get_collection

async def create_booking(db, booking_create: BookingCreate, user_id: str) -> Booking:
    collection = get_collection(db, "bookings")
    booking_dict = booking_create.model_dump()
    booking_dict["user_id"] = user_id
    result = await collection.insert_one(booking_dict)
    booking_dict["id"] = str(result.inserted_id)
    return Booking(**booking_dict)

async def get_user_bookings(db, user_id: str, skip: int = 0, limit: int = 100) -> List[Booking]:
    collection = get_collection(db, "bookings")
    cursor = collection.find({"user_id": user_id}).skip(skip).limit(limit).sort("date_time", -1)
    bookings = []
    async for doc in cursor:
        doc["id"] = str(doc["_id"])
        doc.pop("_id")
        bookings.append(Booking(**doc))
    return bookings

async def get_booking(db, booking_id: str) -> Optional[Booking]:
    collection = get_collection(db, "bookings")
    doc = await collection.find_one({"_id": booking_id})
    if doc:
        doc["id"] = str(doc["_id"])
        doc.pop("_id")
        return Booking(**doc)
    return None

async def update_booking_status(db, booking_id: str, status: str) -> bool:
    collection = get_collection(db, "bookings")
    result = await collection.update_one({"_id": booking_id}, {"$set": {"status": status}})
    return result.modified_count > 0

