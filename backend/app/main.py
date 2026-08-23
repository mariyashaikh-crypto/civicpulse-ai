from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from .api.requests import router as requests_router
from .api.analytics import router as analytics_router
from .api.hotspots import router as hotspots_router
from .api.recommendations import router as recommendations_router
from .api.dashboard import router as dashboard_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="CivicPulse AI",
    description="AI-powered citizen development intelligence platform"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(requests_router, prefix="/api")
app.include_router(analytics_router, prefix="/api")
app.include_router(hotspots_router, prefix="/api")
app.include_router(recommendations_router, prefix="/api")
app.include_router(dashboard_router, prefix="/api")


@app.get("/")
def root():
    return {
        "project": "CivicPulse AI",
        "status": "online"
    }


@app.get("/health")
def health():
    return {"status": "healthy"}