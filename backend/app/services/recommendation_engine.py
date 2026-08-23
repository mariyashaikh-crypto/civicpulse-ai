from pathlib import Path
import pandas as pd

from .priority_engine import calculate_priority


DATA_PATH = Path(__file__).resolve().parent.parent / "data" / "regions.csv"


PROJECTS = {
    "Healthcare": "Construct Primary Healthcare Centre",
    "Water": "Develop Clean Water Supply Infrastructure",
    "Roads": "Upgrade Road Infrastructure",
    "Education": "Construct / Upgrade Government School",
    "Digital Connectivity": "Deploy Rural Digital Connectivity Network",
    "Electricity": "Upgrade Electricity Infrastructure",
    "Public Transport": "Develop Public Transport Facility",
    "Other": "Conduct Infrastructure Development Assessment"
}


def get_recommendations():
    df = pd.read_csv(DATA_PATH)

    df["population_impact"] = (
        df["population"] / df["population"].max()
    ) * 100

    recommendations = []

    for _, row in df.iterrows():

        score = calculate_priority(
            row["citizen_demand"],
            row["infrastructure_gap"],
            row["population_impact"],
            row["urgency"],
            row["investment_gap"]
        )

        recommendations.append({
            "region": row["region"],
            "category": row["category"],
            "recommended_project": PROJECTS.get(
                row["category"],
                PROJECTS["Other"]
            ),
            "priority_score": score,
            "affected_population": int(row["population"]),
            "citizen_demand": row["citizen_demand"],
            "infrastructure_gap": row["infrastructure_gap"],
            "urgency": row["urgency"],
            "investment_gap": row["investment_gap"],
            "reason": (
                f"High citizen demand and significant {row['category'].lower()} "
                f"infrastructure gap affecting approximately "
                f"{int(row['population']):,} people."
            )
        })

    return sorted(
        recommendations,
        key=lambda x: x["priority_score"],
        reverse=True
    )