from sqlalchemy import Column, String, Integer, DateTime, Float
from sqlalchemy.sql import func
from src.database import Base
import uuid

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    hand_length = Column(Float, nullable=True)
    hand_width = Column(Float, nullable=True)
    preferred_language = Column(String, default="en")
    preferred_currency = Column(String, default="USD")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
