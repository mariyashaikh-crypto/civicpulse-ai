from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from collections import Counter

from ..database import get_db
from ..models import CitizenRequest

from ..services.analytics_service import (
    get_overview,
    get_priority_regions
)


router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)


@router.get("/overview")
def overview():
    return get_overview()


@router.get("/priorities")
def priorities():
    return get_priority_regions()


@router.get("/citizen-demand")
def citizen_demand(
    db: Session = Depends(get_db)
):
    """
    Live citizen feedback analytics.

    CSV remains the baseline infrastructure dataset.
    SQLite contains incoming citizen requests.
    """

    requests = db.query(CitizenRequest).all()

    total_requests = len(requests)

    if total_requests == 0:
        return {
            "total_requests": 0,
            "critical_requests": 0,
            "high_requests": 0,
            "languages": {},
            "categories": {},
            "regions": {},
            "message": "No citizen requests received yet"
        }

    # -----------------------------
    # Severity
    # -----------------------------

    critical_requests = sum(
        1 for r in requests
        if r.severity == "Critical"
    )

    high_requests = sum(
        1 for r in requests
        if r.severity == "High"
    )

    # -----------------------------
    # Languages
    # -----------------------------

    languages = Counter(
        r.language for r in requests
    )

    # -----------------------------
    # Categories
    # -----------------------------

    categories = Counter(
        r.category for r in requests
    )

    # -----------------------------
    # Regions
    # -----------------------------

    region_requests = Counter(
        r.location
        for r in requests
        if r.location
        and r.location.lower() != "unknown"
    )

    # -----------------------------
    # Demand hotspots
    # -----------------------------

    hotspots = []

    for region, count in region_requests.most_common():

        region_items = [
            r for r in requests
            if r.location == region
        ]

        critical_count = sum(
            1 for r in region_items
            if r.severity == "Critical"
        )

        high_count = sum(
            1 for r in region_items
            if r.severity == "High"
        )

        hotspots.append({
            "region": region,
            "request_count": count,
            "critical_requests": critical_count,
            "high_requests": high_count,
            "demand_intensity": min(
                100,
                count * 10
                + critical_count * 15
                + high_count * 5
            )
        })

    return {
        "total_requests": total_requests,
        "critical_requests": critical_requests,
        "high_requests": high_requests,
        "languages": dict(languages),
        "categories": dict(categories),
        "regions": dict(region_requests),
        "demand_hotspots": hotspots
    }