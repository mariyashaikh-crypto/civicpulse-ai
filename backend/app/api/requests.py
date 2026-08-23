from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel

from ..database import get_db
from ..models import CitizenRequest
from ..services.ai_service import analyze_request
from ..services.analytics_service import load_data
from ..services.priority_engine import calculate_priority


router = APIRouter(
    prefix="/requests",
    tags=["Citizen Requests"]
)


class RequestCreate(BaseModel):
    message: str
    language: str = "English"
    location: str = "Unknown"
    latitude: float | None = None
    longitude: float | None = None


def find_region_context(location: str):
    """
    Find regional intelligence from the prototype CSV.

    The CSV remains the baseline dataset.
    Citizen requests do not modify the CSV.
    """

    if not location or location.lower() == "unknown":
        return None

    df = load_data()

    matches = df[
        df["region"].str.lower() == location.strip().lower()
    ]

    if matches.empty:
        return None

    return matches.iloc[0].to_dict()


@router.post("/")
def create_request(
    request: RequestCreate,
    db: Session = Depends(get_db)
):
    # --------------------------------
    # 1. Analyze citizen request
    # --------------------------------

    analysis = analyze_request(request.message)

    # --------------------------------
    # 2. Use detected language if
    #    caller did not provide one
    # --------------------------------

    language = request.language

    if not language or language.lower() in ["english", "en"]:
        language = analysis.get("language", "en")

    # --------------------------------
    # 3. Store citizen request
    # --------------------------------

    new_request = CitizenRequest(
        message=request.message,
        language=language,
        category=analysis["category"],
        severity=analysis["severity"],
        location=request.location,
        latitude=request.latitude,
        longitude=request.longitude
    )

    db.add(new_request)
    db.commit()
    db.refresh(new_request)

    # --------------------------------
    # 4. Find regional context
    # --------------------------------

    region_context = find_region_context(request.location)

    priority_preview = None

    if region_context:

        population_impact = (
            region_context["population"]
            / 900000
        ) * 100

        # Use citizen request severity to adjust urgency.
        severity_urgency = {
            "Critical": 100,
            "High": 85,
            "Medium": 65
        }

        request_urgency = severity_urgency.get(
            analysis["severity"],
            65
        )

        # Combine request signal with existing
        # regional intelligence.
        effective_demand = max(
            region_context["citizen_demand"],
            80 if analysis["severity"] == "Critical"
            else 70 if analysis["severity"] == "High"
            else 60
        )

        effective_urgency = max(
            region_context["urgency"],
            request_urgency
        )

        priority_score = calculate_priority(
            effective_demand,
            region_context["infrastructure_gap"],
            population_impact,
            effective_urgency,
            region_context["investment_gap"]
        )

        priority_preview = {
            "region": region_context["region"],
            "category": analysis["category"],
            "priority_score": priority_score,
            "population": int(region_context["population"]),
            "infrastructure_gap": region_context["infrastructure_gap"],
            "investment_gap": region_context["investment_gap"],
            "citizen_demand_baseline": region_context["citizen_demand"],
            "request_severity": analysis["severity"]
        }

    # --------------------------------
    # 5. Response
    # --------------------------------

    return {
        "success": True,
        "request_id": new_request.id,

        "analysis": analysis,

        "regional_context": priority_preview,

        "message": "Citizen request analyzed and stored"
    }


@router.get("/")
def get_requests(
    db: Session = Depends(get_db)
):
    requests = db.query(CitizenRequest).all()

    return requests