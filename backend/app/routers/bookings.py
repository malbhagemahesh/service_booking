from typing import List

from fastapi import APIRouter, Depends, HTTPException

from app.schemas import BookingCreate, Booking
from app.services.booking_service import create_booking, get_user_bookings, get_booking, update_booking_status
from app.core.deps import get_current_user
from app.db.client import get_db_client

router = APIRouter(prefix="/bookings", tags=["bookings"])

@router.post("", response_model=Booking)
async def create_new_booking(
    booking: BookingCreate,
    current_user = Depends(get_current_user),
    db = Depends(get_db_client)
):
    return await create_booking(db, booking, current_user.id)

@router.get("/my", response_model=List[Booking])
async def read_my_bookings(
    skip: int = 0,
    limit: int = 100,
    current_user = Depends(get_current_user),
    db = Depends(get_db_client)
):
    return await get_user_bookings(db, current_user.id, skip, limit)

@router.get("/{booking_id}", response_model=Booking)
async def read_booking(booking_id: str, current_user = Depends(get_current_user), db = Depends(get_db_client)):
    booking = await get_booking(db, booking_id)
    if booking is None or booking.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking

@router.put("/{booking_id}/status")
async def update_status(booking_id: str, status: str, current_user = Depends(get_current_user), db = Depends(get_db_client)):
    booking = await get_booking(db, booking_id)
    if booking is None or booking.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Booking not found")
    updated = await update_booking_status(db, booking_id, status)
    if not updated:
        raise HTTPException(status_code=400, detail="Update failed")
    return {"ok": True}

