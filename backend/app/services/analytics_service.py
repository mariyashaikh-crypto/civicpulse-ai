import pandas as pd
from pathlib import Path
from .priority_engine import calculate_priority


DATA_PATH = Path(__file__).resolve().parent.parent / "data" / "regions.csv"


def load_data():
    return pd.read_csv(DATA_PATH)


def get_priority_regions():
    df = load_data()

    df["population_impact"] = (
        df["population"] / df["population"].max()
    ) * 100

    df["priority_score"] = df.apply(
        lambda row: calculate_priority(
            row["citizen_demand"],
            row["infrastructure_gap"],
            row["population_impact"],
            row["urgency"],
            row["investment_gap"]
        ),
        axis=1
    )

    return df.sort_values(
        "priority_score",
        ascending=False
    ).to_dict(orient="records")


def get_overview():
    df = load_data()
    priorities = get_priority_regions()

    return {
        "regions_analyzed": len(df),
        "total_population": int(df["population"].sum()),
        "total_requests_estimate": int(df["citizen_demand"].sum() * 100),
        "critical_regions": sum(
            1 for x in priorities
            if x["priority_score"] >= 85
        ),
        "top_priority": priorities[0]
    }