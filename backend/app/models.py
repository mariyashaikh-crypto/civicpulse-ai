from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime

from .database import Base


class CitizenRequest(Base):
    __tablename__ = "citizen_requests"

    id = Column(Integer, primary_key=True, index=True)
    message = Column(String, nullable=False)
    language = Column(String, default="English")
    category = Column(String, default="Other")
    severity = Column(String, default="Medium")
    location = Column(String, default="Unknown")
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)