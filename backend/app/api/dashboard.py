from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from collections import Counter

from ..database import get_db
from ..models import CitizenRequest

from ..services.analytics_service import (
    get_overview,
    get_priority_regions
)
from ..services.hotspot_engine import get_hotspots
from ..services.recommendation_engine import get_recommendations


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


def get_citizen_intelligence(db: Session):
    requests = db.query(CitizenRequest).all()

    total = len(requests)

    if total == 0:
        return {
            "total_requests": 0,
            "critical_requests": 0,
            "high_requests": 0,
            "languages": {},
            "categories": {},
            "regions": {},
            "demand_hotspots": []
        }

    critical = sum(
        1 for r in requests
        if r.severity == "Critical"
    )

    high = sum(
        1 for r in requests
        if r.severity == "High"
    )

    # Normalize language values
    language_map = {
        "English": "en",
        "english": "en",
        "EN": "en",
        "Hindi": "hi",
        "hindi": "hi",
        "HI": "hi",
        "Marathi": "mr",
        "marathi": "mr",
        "MR": "mr"
    }

    languages = Counter(
        language_map.get(
            r.language,
            r.language
        )
        for r in requests
    )

    categories = Counter(
        r.category
        for r in requests
    )

    regions = Counter(
        r.location
        for r in requests
        if r.location
        and r.location.lower() != "unknown"
    )

    demand_hotspots = []

    for region, count in regions.most_common():

        region_requests = [
            r for r in requests
            if r.location == region
        ]

        critical_count = sum(
            1 for r in region_requests
            if r.severity == "Critical"
        )

        high_count = sum(
            1 for r in region_requests
            if r.severity == "High"
        )

        demand_intensity = min(
            100,
            count * 10
            + critical_count * 15
            + high_count * 5
        )

        demand_hotspots.append({
            "region": region,
            "request_count": count,
            "critical_requests": critical_count,
            "high_requests": high_count,
            "demand_intensity": demand_intensity
        })

    return {
        "total_requests": total,
        "critical_requests": critical,
        "high_requests": high,
        "languages": dict(languages),
        "categories": dict(categories),
        "regions": dict(regions),
        "demand_hotspots": demand_hotspots
    }


@router.get("/")
def dashboard(
    db: Session = Depends(get_db)
):
    priorities = get_priority_regions()
    recommendations = get_recommendations()
    hotspots = get_hotspots()

    citizen_intelligence = get_citizen_intelligence(db)

    return {
        "overview": get_overview(),

        "citizen_intelligence": citizen_intelligence,

        "top_priorities": priorities[:5],

        "hotspots": hotspots,

        "recommendations": recommendations[:5]
    }