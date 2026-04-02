from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    # MongoDB
    mongo_uri: str = "mongodb://localhost:27017/service_booking"
    
    # Security
    secret_key: str = "your-super-secret-key-change-in-prod"
    access_token_expire_minutes: int = 30
    
    # Frontend
    frontend_url: str = "http://localhost:5173"
    
    class Config:
        env_file = ".env"

settings = Settings()

