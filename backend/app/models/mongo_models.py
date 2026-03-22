from datetime import datetime, timezone
from typing import Optional, List
from enum import Enum
from pydantic import BaseModel, Field
from bson import ObjectId


def utcnow():
    return datetime.now(timezone.utc)


class ContentType(str, Enum):
    text = "text"
    video = "video"


# ── Lesson document ────────────────────────────────────────────────────────────
class LessonDocument(BaseModel):
    """Stored in MongoDB lessons collection"""
    id: Optional[str] = Field(None, alias="_id")
    course_id: str                          # References PostgreSQL courses.id
    title: str
    order: int
    content_type: ContentType
    content_body: str                       # Text content or video URL
    created_at: datetime = Field(default_factory=utcnow)

    model_config = {"populate_by_name": True}

    def to_mongo(self) -> dict:
        data = self.model_dump(exclude={"id"}, by_alias=False)
        return data

    @classmethod
    def from_mongo(cls, data: dict) -> "LessonDocument":
        if data and "_id" in data:
            data["_id"] = str(data["_id"])
        return cls(**data)


# ── Progress document ──────────────────────────────────────────────────────────
class ProgressDocument(BaseModel):
    """Stored in MongoDB progress collection — one doc per (user, course) pair"""
    id: Optional[str] = Field(None, alias="_id")
    user_id: str                            # References PostgreSQL users.id
    course_id: str                          # References PostgreSQL courses.id
    completed_lessons: List[str] = []       # List of lesson _id strings
    last_accessed: datetime = Field(default_factory=utcnow)
    completed_at: Optional[datetime] = None

    model_config = {"populate_by_name": True}

    def to_mongo(self) -> dict:
        data = self.model_dump(exclude={"id"}, by_alias=False)
        return data

    @classmethod
    def from_mongo(cls, data: dict) -> "ProgressDocument":
        if data and "_id" in data:
            data["_id"] = str(data["_id"])
        return cls(**data)