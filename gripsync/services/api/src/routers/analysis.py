from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from src.database import get_db
from src.schemas.requests import AnalysisSubmit
from src.schemas.responses import AnalysisResponse
from src.models.analysis import AnalysisResult
from src.models.session import AnalysisSession
from src.models.user import User
from src.auth import get_current_user
from src.services.recommendation_engine import generate_recommendations

router = APIRouter()

@router.post("/{session_id}", response_model=AnalysisResponse)
async def submit_analysis(session_id: str, analysis: AnalysisSubmit, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(AnalysisSession).where(AnalysisSession.id == session_id, AnalysisSession.user_id == current_user.id))
    if not result.scalars().first():
        raise HTTPException(status_code=404, detail="Session not found")

    new_result = AnalysisResult(
        session_id=session_id,
        **analysis.dict(),
        verdict_setup_grade="B",
        verdict_aim_grade="A",
        verdict_tag="Aggressive Tracker",
        verdict_one_liner="Good aim, limited by mouse weight.",
        verdict_brief_markdown="# Analysis\\nYour mouse is too heavy for your tracking style."
    )
    db.add(new_result)
    await db.commit()
    await db.refresh(new_result)
    
    await generate_recommendations(session_id, new_result, db)
    
    return new_result

@router.get("/{session_id}", response_model=AnalysisResponse)
async def get_analysis(session_id: str, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(AnalysisResult).join(AnalysisSession).where(AnalysisSession.id == session_id, AnalysisSession.user_id == current_user.id))
    db_result = result.scalars().first()
    if not db_result:
        raise HTTPException(status_code=404, detail="Analysis not found")
    return db_result
