from pydantic import BaseModel, EmailStr
from typing import Optional, Dict, Any, List
from datetime import datetime

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class UserUpdate(BaseModel):
    hand_length: Optional[float] = None
    hand_width: Optional[float] = None
    preferred_language: Optional[str] = None
    preferred_currency: Optional[str] = None

class SessionCreate(BaseModel):
    game_name: str
    started_at: datetime

class SessionUpdate(BaseModel):
    ended_at: datetime
    duration_seconds: int
    status: str

class AnalysisSubmit(BaseModel):
    grip_type: str
    grip_confidence: float
    grip_features: Dict[str, Any]
    playstyle_type: str
    playstyle_sub_traits: Dict[str, Any]
    playstyle_metrics: Dict[str, Any]
    setup_score: float
    setup_bottlenecks: List[str]

class WalletItemCreate(BaseModel):
    peripheral_id: str
    monthly_savings: float
    saved_amount: float = 0.0
    currency_code: str = "USD"

class WalletItemUpdate(BaseModel):
    saved_amount: float
    monthly_savings: Optional[float] = None
