from fastapi import APIRouter
from ..services.hotspot_engine import get_hotspots

router = APIRouter(
    prefix="/hotspots",
    tags=["Hotspots"]
)


@router.get("/")
def hotspots():
    return get_hotspots()