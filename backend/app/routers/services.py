from typing import List

from fastapi import APIRouter, Depends, HTTPException

from app.schemas import ServiceCreate, Service
from app.services.service_service import create_service, get_services, get_service, update_service, delete_service
from app.core.deps import get_current_user
from app.db.client import get_db_client

router = APIRouter(prefix="/services", tags=["services"])

@router.get("", response_model=List[Service])
async def read_services(skip: int = 0, limit: int = 100, db = Depends(get_db_client)):
    services = await get_services(db, skip, limit)
    return services

@router.get("/{service_id}", response_model=Service)
async def read_service(service_id: str, db = Depends(get_db_client)):
    service = await get_service(db, service_id)
    if service is None:
        raise HTTPException(status_code=404, detail="Service not found")
    return service

@router.post("", response_model=Service)
async def create_new_service(
    service: ServiceCreate,
    current_user = Depends(get_current_user),
    db = Depends(get_db_client)
):
    if current_user.role != "provider":
        raise HTTPException(status_code=403, detail="Not a provider")
    return await create_service(db, service, current_user.id)

@router.put("/{service_id}", response_model=Service)
async def update_existing_service(
    service_id: str,
    service_update: ServiceCreate,
    current_user = Depends(get_current_user),
    db = Depends(get_db_client)
):
    service = await get_service(db, service_id)
    if service is None or service.provider_id != current_user.id:
        raise HTTPException(status_code=404, detail="Service not found")
    updated = await update_service(db, service_id, service_update.model_dump())
    if not updated:
        raise HTTPException(status_code=400, detail="Update failed")
    return await get_service(db, service_id)

@router.delete("/{service_id}")
async def delete_service_route(
    service_id: str,
    current_user = Depends(get_current_user),
    db = Depends(get_db_client)
):
    service = await get_service(db, service_id)
    if service is None or service.provider_id != current_user.id:
        raise HTTPException(status_code=404, detail="Service not found")
    deleted = await delete_service(db, service_id)
    if not deleted:
        raise HTTPException(status_code=400, detail="Delete failed")
    return {"ok": True}

