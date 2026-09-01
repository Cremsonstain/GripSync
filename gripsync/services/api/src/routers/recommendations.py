from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List, Optional
from src.database import get_db
from src.schemas.responses import RecommendationResponse, PeripheralResponse
from src.models.recommendation import Recommendation
from src.models.peripheral import Peripheral
from src.models.session import AnalysisSession
from src.models.user import User
from src.auth import get_current_user
from sqlalchemy.orm import selectinload

router = APIRouter()

@router.get("/session/{session_id}", response_model=List[RecommendationResponse])
async def get_session_recommendations(session_id: str, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(AnalysisSession).where(AnalysisSession.id == session_id, AnalysisSession.user_id == current_user.id))
    if not result.scalars().first():
        raise HTTPException(status_code=404, detail="Session not found")
        
    result = await db.execute(
        select(Recommendation, Peripheral)
        .join(Peripheral, Recommendation.peripheral_id == Peripheral.id)
        .where(Recommendation.session_id == session_id)
        .order_by(Recommendation.priority_score.desc())
    )
    
    recs = []
    for rec, periph in result.all():
        recs.append(RecommendationResponse(
            id=rec.id,
            peripheral=periph,
            match_score=rec.match_score,
            reasons=rec.reasons,
            priority_score=rec.priority_score,
            impact_estimate=rec.impact_estimate
        ))
    return recs

@router.get("/peripherals", response_model=List[PeripheralResponse])
async def search_peripherals(
    category: Optional[str] = None,
    brand: Optional[str] = None,
    db: AsyncSession = Depends(get_db)
):
    query = select(Peripheral)
    if category:
        query = query.where(Peripheral.category == category)
    if brand:
        query = query.where(Peripheral.brand == brand)
        
    result = await db.execute(query)
    return result.scalars().all()

@router.get("/peripherals/{peripheral_id}", response_model=PeripheralResponse)
async def get_peripheral(peripheral_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Peripheral).where(Peripheral.id == peripheral_id))
    periph = result.scalars().first()
    if not periph:
        raise HTTPException(status_code=404, detail="Peripheral not found")
    return periph
