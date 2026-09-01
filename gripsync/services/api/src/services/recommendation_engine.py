from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from src.models.peripheral import Peripheral
from src.models.recommendation import Recommendation
from src.models.analysis import AnalysisResult

async def generate_recommendations(session_id: str, analysis: AnalysisResult, db: AsyncSession):
    # Mock recommendation engine
    # Fetch some mice
    result = await db.execute(select(Peripheral).where(Peripheral.category == "mouse").limit(2))
    peripherals = result.scalars().all()
    
    for idx, periph in enumerate(peripherals):
        rec = Recommendation(
            session_id=session_id,
            peripheral_id=periph.id,
            match_score=95.0 - (idx * 5),
            reasons=["Great for your grip type", "Lightweight for tracking"],
            priority_score=100.0 - (idx * 10),
            impact_estimate=8.5
        )
        db.add(rec)
    
    await db.commit()
