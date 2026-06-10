from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from contextlib import asynccontextmanager
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, field_validator
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

mongo_url = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
db_name = os.environ.get("DB_NAME", "mandelbrot_db")

client = AsyncIOMotorClient(mongo_url)
db = client[db_name]


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    client.close()


app = FastAPI(lifespan=lifespan)

api_router = APIRouter(prefix="/api")


# define models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


# PII note: email is retained solely for follow-up response and must never appear in logs.
class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str  # PII is stored in controlled DB only; omitted from all API responses
    budget: Optional[str] = None
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactCreate(BaseModel):
    name: str
    email: str
    budget: Optional[str] = None
    message: str
    # Explicit consent is required before email is stored (GDPR/CCPA).
    consent: bool

    @field_validator("consent")
    @classmethod
    def consent_must_be_true(cls, v: bool) -> bool:
        if not v:
            raise ValueError("User consent is required to store contact information")
        return v


# Response model: email is intentionally omitted to prevent PII exposure.
class ContactView(BaseModel):
    id: str
    name: str
    message: str
    timestamp: datetime


# routes
@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    try:
        await db.status_checks.insert_one(status_obj.model_dump())
    except Exception as e:
        logger.error("Failed to insert status check: %s", e)
        raise HTTPException(status_code=500, detail="Failed to save status check")
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    try:
        status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    except Exception as e:
        logger.error("Failed to fetch status checks: %s", e)
        raise HTTPException(status_code=500, detail="Failed to retrieve status checks")
    return status_checks


@api_router.post("/contact", response_model=ContactView)
async def create_contact(input: ContactCreate):
    # consent validated by ContactCreate; email stored for follow-up only, never log request body
    contact_obj = ContactSubmission(**input.model_dump())
    try:
        await db.contact_submissions.insert_one(contact_obj.model_dump())
    except Exception as e:
        logger.error("Failed to insert contact submission: %s", e)
        raise HTTPException(status_code=500, detail="Failed to save contact submission")
    return ContactView(
        id=contact_obj.id,
        name=contact_obj.name,
        message=contact_obj.message,
        timestamp=contact_obj.timestamp,
    )


@api_router.get("/contacts", response_model=List[ContactView])
async def get_contacts():
    try:
        contacts = await db.contact_submissions.find({}, {"_id": 0}).to_list(1000)
    except Exception as e:
        logger.error("Failed to fetch contacts: %s", e)
        raise HTTPException(status_code=500, detail="Failed to retrieve contacts")
    return contacts


def _parse_cors_origins(raw: Optional[str]) -> List[str]:
    if not raw:
        logging.getLogger(__name__).warning(
            "CORS_ORIGINS not set; defaulting to http://localhost:5173 only"
        )
        return ["http://localhost:5173"]
    origins = [o.strip() for o in raw.split(",") if o.strip()]
    if "*" in origins:
        logging.getLogger(__name__).warning(
            "CORS_ORIGINS contains '*' — all origins are allowed; restrict this in production"
        )
    return origins


app.add_middleware(
    CORSMiddleware,
    allow_origins=_parse_cors_origins(os.environ.get("CORS_ORIGINS")),
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

# logging & mogging
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)
