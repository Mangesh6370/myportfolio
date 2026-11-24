from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, EmailStr
from datetime import datetime
import json
from pathlib import Path

app = FastAPI(title="Mangesh Portfolio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

MESSAGES_FILE = Path(__file__).parent / "messages.json"


class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str


@app.post("/api/contact")
async def receive_contact(payload: ContactMessage):
    entry = {
        "timestamp": datetime.utcnow().isoformat(),
        **payload.model_dump(),
    }
    existing = []
    if MESSAGES_FILE.exists():
        existing = json.loads(MESSAGES_FILE.read_text(encoding="utf-8"))
    existing.append(entry)
    MESSAGES_FILE.write_text(json.dumps(existing, indent=2), encoding="utf-8")
    return {"status": "ok", "message": "Message saved successfully"}


# Serve the portfolio frontend directly from FastAPI if desired:
# Run from project root: uvicorn backend.python-fastapi.main:app --reload
frontend_dir = Path(__file__).resolve().parents[2]
app.mount("/", StaticFiles(directory=str(frontend_dir), html=True), name="static")
