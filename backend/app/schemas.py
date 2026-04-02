from typing import Optional, List
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime


# =========================
# USER SCHEMAS
# =========================

class UserBase(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr


class UserCreate(UserBase):
    password: str = Field(..., min_length=8)


class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None


class User(UserBase):
    id: str
    hashed_password: str
    role: str = "user"  # user | provider

    class Config:
        from_attributes = True


# =========================
# SERVICE SCHEMAS
# =========================

class ServiceBase(BaseModel):
    title: str = Field(..., max_length=200)
    description: str
    price: float
    category: str  # plumbing, cleaning, etc.


class ServiceCreate(ServiceBase):
    pass


class Service(ServiceBase):
    id: str
    provider_id: str
    rating: float = 0.0
    reviews: int = 0


# =========================
# BOOKING SCHEMAS
# =========================

class BookingBase(BaseModel):
    service_id: str
    date_time: datetime


class BookingCreate(BookingBase):
    pass


class Booking(BookingBase):
    id: str
    user_id: str
    status: str = "pending"  # pending, confirmed, completed, cancelled


# =========================
# AUTH TOKEN
# =========================

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"