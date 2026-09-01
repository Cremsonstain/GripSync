from pydantic import BaseModel, EmailStr
from typing import Optional, Dict, Any, List
from datetime import datetime

class UserResponse(BaseModel):
    id: str
    username: str
    email: EmailStr
    hand_length: Optional[float]
    hand_width: Optional[float]
    preferred_language: str
    preferred_currency: str

    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    access_token: str
    token_type: str

class SessionResponse(BaseModel):
    id: str
    user_id: str
    game_name: str
    started_at: datetime
    ended_at: Optional[datetime]
    duration_seconds: Optional[int]
    status: Optional[str]

    class Config:
        from_attributes = True
        
class AnalysisResponse(BaseModel):
    id: str
    session_id: str
    grip_type: str
    playstyle_type: str
    verdict_setup_grade: str
    verdict_aim_grade: str
    verdict_tag: str
    verdict_one_liner: str

    class Config:
        from_attributes = True

class PeripheralResponse(BaseModel):
    id: str
    name: str
    brand: str
    category: str
    price_usd: float
    image_url: str
    purchase_url: str

    class Config:
        from_attributes = True

class RecommendationResponse(BaseModel):
    id: str
    peripheral: PeripheralResponse
    match_score: float
    reasons: List[str]
    priority_score: float
    impact_estimate: float

    class Config:
        from_attributes = True

class WalletItemResponse(BaseModel):
    id: str
    peripheral: PeripheralResponse
    target_price: float
    currency_code: str
    monthly_savings: float
    saved_amount: float
    start_date: datetime
    target_date: Optional[datetime]
    is_completed: bool

    class Config:
        from_attributes = True
