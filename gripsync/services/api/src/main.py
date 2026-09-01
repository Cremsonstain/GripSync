from fastapi import FastAPI, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from src.database import engine, Base
from src.routers import users, sessions, analysis, recommendations, wallet, ws
from src.config import settings

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Setup db here if needed, for now assuming alembic or init.sql does it
    yield
    await engine.dispose()

app = FastAPI(title="GripSync API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(sessions.router, prefix="/api/sessions", tags=["sessions"])
app.include_router(analysis.router, prefix="/api/analysis", tags=["analysis"])
app.include_router(recommendations.router, prefix="/api/recommendations", tags=["recommendations"])
app.include_router(wallet.router, prefix="/api/wallet", tags=["wallet"])
app.include_router(ws.router, prefix="/ws", tags=["websocket"])

@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "GripSync API"}
