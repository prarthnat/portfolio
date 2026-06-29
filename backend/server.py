from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

app = FastAPI()
api_router = APIRouter(prefix="/api")


class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactMessageCreate(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    email: EmailStr
    message: str = Field(min_length=1, max_length=2000)


class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class GuestbookEntryCreate(BaseModel):
    nickname: str = Field(min_length=1, max_length=40)
    note: str = Field(min_length=1, max_length=200)


class GuestbookEntry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    nickname: str
    note: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


@api_router.get("/")
async def root():
    return {"message": "PrarthnaOS backend online ♡"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(payload: StatusCheckCreate):
    obj = StatusCheck(client_name=payload.client_name)
    doc = obj.model_dump()
    doc["timestamp"] = doc["timestamp"].isoformat()
    await db.status_checks.insert_one(doc)
    return obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks(limit: int = 50):
    rows = await db.status_checks.find({}, {"_id": 0}).sort("timestamp", -1).to_list(limit)
    for r in rows:
        if isinstance(r.get("timestamp"), str):
            r["timestamp"] = datetime.fromisoformat(r["timestamp"])
    return rows


@api_router.post("/contact", response_model=ContactMessage)
async def submit_contact(payload: ContactMessageCreate):
    obj = ContactMessage(name=payload.name, email=payload.email, message=payload.message)
    doc = obj.model_dump()
    doc["timestamp"] = doc["timestamp"].isoformat()
    await db.contact_messages.insert_one(doc)
    logger.info(f"New contact message from {payload.email}")
    return obj


@api_router.post("/guestbook", response_model=GuestbookEntry)
async def add_guestbook(payload: GuestbookEntryCreate):
    obj = GuestbookEntry(nickname=payload.nickname, note=payload.note)
    doc = obj.model_dump()
    doc["timestamp"] = doc["timestamp"].isoformat()
    await db.guestbook.insert_one(doc)
    return obj


@api_router.get("/guestbook", response_model=List[GuestbookEntry])
async def list_guestbook(limit: int = 50):
    rows = await db.guestbook.find({}, {"_id": 0}).sort("timestamp", -1).to_list(limit)
    for r in rows:
        if isinstance(r.get("timestamp"), str):
            r["timestamp"] = datetime.fromisoformat(r["timestamp"])
    return rows


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
