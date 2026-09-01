from sqlalchemy import Column, String, Integer, Float, ForeignKey, JSON
from src.database import Base
import uuid

class AnalysisResult(Base):
    __tablename__ = "analysis_results"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    session_id = Column(String, ForeignKey("analysis_sessions.id"))
    grip_type = Column(String)
    grip_confidence = Column(Float)
    grip_features = Column(JSON)
    playstyle_type = Column(String)
    playstyle_sub_traits = Column(JSON)
    playstyle_metrics = Column(JSON)
    setup_score = Column(Float)
    setup_bottlenecks = Column(JSON)
    verdict_setup_grade = Column(String)
    verdict_aim_grade = Column(String)
    verdict_tag = Column(String)
    verdict_one_liner = Column(String)
    verdict_brief_markdown = Column(String)
