def calculate_priority(
    citizen_demand: float,
    infrastructure_gap: float,
    population_impact: float,
    urgency: float,
    investment_gap: float
) -> float:

    score = (
        citizen_demand * 0.35
        + infrastructure_gap * 0.25
        + population_impact * 0.20
        + urgency * 0.10
        + investment_gap * 0.10
    )

    return round(score, 2)