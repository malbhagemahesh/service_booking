from typing import Optional

from app.core.security import verify_password, get_password_hash, create_access_token
from app.schemas import UserCreate, User
from app.db.client import get_collection

async def create_user(db, user_create: UserCreate) -> User:
    collection = get_collection(db, "users")
    hashed_pwd = get_password_hash(user_create.password)
    user_dict = user_create.model_dump(exclude={"password"})
    user_dict["hashed_password"] = hashed_pwd
    result = await collection.insert_one(user_dict)
    user_dict["id"] = str(result.inserted_id)
    return User(**user_dict)

async def get_user_by_email(db, email: str) -> Optional[User]:
    collection = get_collection(db, "users")
    user_dict = await collection.find_one({"email": email})
    if user_dict:
        user_dict["id"] = str(user_dict["_id"])
        user_dict.pop("_id")
        return User(**user_dict)
    return None

async def authenticate_user(db, email: str, password: str) -> Optional[User]:
    user = await get_user_by_email(db, email)
    if not user or not verify_password(password, user.hashed_password):
        return None
    return user

