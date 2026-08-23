from fastapi import APIRouter
from ..services.recommendation_engine import get_recommendations

router = APIRouter(
    prefix="/recommendations",
    tags=["Recommendations"]
)


@router.get("/")
def recommendations():
    return get_recommendations()