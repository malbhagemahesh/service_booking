from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.core.config import settings
from app.db.client import get_db_client

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Connect DB
    app.state.db = get_db_client()
    yield
    # Shutdown
    app.state.db.client.close()

app = FastAPI(
    title="Service Booking API",
    version="1.0.0",
    lifespan=lifespan
)

# ✅ CORS FIX (important)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all for now
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ ROOT ROUTE (fix 404)
@app.get("/")
async def root():
    return {"message": "API Running"}

# ✅ HEALTH CHECK
@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# Include routers
from app.routers.auth import router as auth_router
from app.routers.services import router as services_router
from app.routers.bookings import router as bookings_router

app.include_router(auth_router, prefix="/api", tags=["auth"])
app.include_router(services_router, prefix="/api", tags=["services"])
app.include_router(bookings_router, prefix="/api", tags=["bookings"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)