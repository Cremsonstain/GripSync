from sqlalchemy import Column, String, Float, ForeignKey, JSON
from src.database import Base
import uuid

class Recommendation(Base):
    __tablename__ = "recommendations"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    session_id = Column(String, ForeignKey("analysis_sessions.id"))
    peripheral_id = Column(String, ForeignKey("peripherals.id"))
    match_score = Column(Float)
    reasons = Column(JSON)
    priority_score = Column(Float)
    impact_estimate = Column(Float)
