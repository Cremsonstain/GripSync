# GripSync — Gaming Performance Optimization Platform

> **GripSync** is a cross-platform (Web + Android + Desktop) system that records, analyzes, and optimizes a gamer's physical setup — grip style, hand movement, playstyle, and peripheral configuration — then recommends hardware upgrades and tracks budget savings.

---

## 🤖 AI Agent Context & Context Handoff Protocol

If you are an **AI Agent** reading or modifying this codebase, refer to the following specifications:

### Core Architecture Breakdown

- `services/api/`: **FastAPI Async Backend Service**
  - **Framework**: FastAPI + SQLAlchemy (AsyncPG) + Pydantic v2
  - **Auth**: JWT Authentication (`/api/users/register`, `/api/users/login`, `/api/users/me`)
  - **Routers**:
    - `users`: User profiles, hand dimensions, language/currency preferences.
    - `sessions`: Gaming session lifecycle management (started_at, ended_at, status).
    - `analysis`: Submission of grip & playstyle metrics; calculates setup evaluation score & returns brutal verdict.
    - `recommendations`: Recommendation engine pairing peripherals (mice, pads, skates, keyboards, monitors) with compatibility scores.
    - `wallet`: Budget planner supporting multi-currency target savings & completion projections.
    - `ws`: Real-time WebSocket streaming (`/ws/analysis/{session_id}`) for raw landmark/input stream handling.

- `packages/analysis-engine/`: **Python ML Analysis Engine**
  - **MediaPipe Hand Landmarker Tasks API**: 21 3D hand keypoints per frame (`src/capture/hand_tracker.py`).
  - **Raw Input Logger**: OS-level mouse delta & key event tracking (`src/capture/input_logger.py`).
  - **Screen Capture & OCR**: Game stat & killfeed OCR pipeline (`src/capture/screen_analyzer.py`).
  - **Classifiers**:
    - `GripClassifier`: Classifies Palm, Claw, Fingertip, or Hybrid grip based on contact ratio, finger arch angle, thumb position, and stability.
    - `PlaystyleClassifier`: Classifies Flick Aimer, Tracker, or Hybrid based on velocity percentiles (p50, p90, p99), flick ratio, and tracking duration.
    - `SetupEvaluator`: Evaluates monitor Hz, mouse weight vs grip type, eDPI, and mousepad surface type.
    - `VerdictGenerator`: Generates graded verdict tags (`SKILL_ISSUE`, `BUDGET_WARRIOR`, `PEAK_PERFORMANCE`, `IDENTITY_CRISIS`) and honest one-liners.

- `packages/shared-types/`: **TypeScript Shared Types Library**
  - Shared contracts for analysis, peripherals, wallet, and user models.

- `apps/web/`: **Next.js 14 Web Dashboard**
  - Next.js 14 App Router, Tailwind CSS, Lucide icons, i18n, Zustand state management.

- `database/`: **Postgres Schema & Seed Data**
  - `database/schema/init.sql`: SQL initialization script.
  - `database/seed/peripherals.json`: Real gaming peripheral specifications (Logitech, Razer, Zowie, Artisan, Wooting, etc.).
  - `database/seed/seed.py`: Async seed script for database initialization.

---

## 🚀 Quick Start for Developers & Agents

### Backend Service (FastAPI)

```bash
cd gripsync/services/api
python -m venv venv
# Windows: venv\Scripts\activate
# Linux/macOS: source venv/bin/activate
pip install -r pyproject.toml # or poetry install
uvicorn src.main:app --reload --port 8000
```

### Analysis Engine

```bash
cd gripsync/packages/analysis-engine
pip install -e .
pytest tests/
```

### Web Frontend

```bash
cd gripsync/apps/web
pnpm install
pnpm dev
```

---

## 📌 Labels & Categories

- `backend`: `services/api`
- `ml-engine`: `packages/analysis-engine`
- `shared-types`: `packages/shared-types`
- `frontend`: `apps/web`
- `database`: `database/`

---

## 📄 License
MIT License.
