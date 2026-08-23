from pathlib import Path
import pandas as pd


DATA_PATH = Path(__file__).resolve().parent.parent / "data" / "regions.csv"


def get_hotspots():
    df = pd.read_csv(DATA_PATH)

    hotspots = []

    for _, row in df.iterrows():
        hotspots.append({
            "region": row["region"],
            "category": row["category"],
            "latitude": row["latitude"],
            "longitude": row["longitude"],
            "demand": row["citizen_demand"],
            "severity": row["urgency"]
        })

    return hotspots