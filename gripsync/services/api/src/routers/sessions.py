from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from src.database import get_db
from src.schemas.requests import SessionCreate, SessionUpdate
from src.schemas.responses import SessionResponse
from src.models.session import AnalysisSession
from src.models.user import User
from src.auth import get_current_user

router = APIRouter()

@router.post("/", response_model=SessionResponse)
async def create_session(session: SessionCreate, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    new_session = AnalysisSession(**session.dict(), user_id=current_user.id, status="active")
    db.add(new_session)
    await db.commit()
    await db.refresh(new_session)
    return new_session

@router.put("/{session_id}", response_model=SessionResponse)
async def update_session(session_id: str, session: SessionUpdate, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(AnalysisSession).where(AnalysisSession.id == session_id, AnalysisSession.user_id == current_user.id))
    db_session = result.scalars().first()
    if not db_session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    for key, value in session.dict().items():
        setattr(db_session, key, value)
    await db.commit()
    await db.refresh(db_session)
    return db_session

@router.get("/", response_model=List[SessionResponse])
async def list_sessions(current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(AnalysisSession).where(AnalysisSession.user_id == current_user.id).order_by(AnalysisSession.started_at.desc()))
    return result.scalars().all()

@router.get("/{session_id}", response_model=SessionResponse)
async def get_session(session_id: str, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(AnalysisSession).where(AnalysisSession.id == session_id, AnalysisSession.user_id == current_user.id))
    db_session = result.scalars().first()
    if not db_session:
        raise HTTPException(status_code=404, detail="Session not found")
    return db_session
