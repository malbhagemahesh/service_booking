from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from app.core.security import verify_token
from app.db.client import get_db_client
from app.schemas import User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

async def get_current_user(token: str = Depends(oauth2_scheme), db = Depends(get_db_client)) -> User:
    user_data = await verify_token(token)
    if user_data is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    user = await get_user_by_email(db, user_data.username)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

