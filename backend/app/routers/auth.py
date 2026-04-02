from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer

from app.services.auth_service import create_user, authenticate_user, get_user_by_email
from app.core.deps import oauth2_scheme
from app.schemas import UserCreate, User, Token

from app.core.security import create_access_token, verify_token
from app.services.auth_service import create_user, authenticate_user
from app.schemas import UserCreate, User, Token
from app.db.client import get_db_client

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=User)
async def register(user_create: UserCreate, db = Depends(get_db_client)):
    # Check if exists
    existing = await get_user_by_email(db, user_create.email)
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    user = await create_user(db, user_create)
    return user

@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db = Depends(get_db_client)):
    user = await authenticate_user(db, form_data.username, form_data.password)  # email as username
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=User)
async def read_users_me(token: str = Depends(oauth2_scheme), db = Depends(get_db_client)):
    user_data = await verify_token(token)
    if user_data is None:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = await get_user_by_email(db, user_data.username)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

