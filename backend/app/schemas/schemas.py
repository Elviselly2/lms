from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr, field_validator
from app.models.sql_models import UserRole
from app.models.mongo_models import ContentType


# ── Auth schemas ───────────────────────────────────────────────────────────────
class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    full_name: str

    @field_validator("password")
    @classmethod
    def password_strength(cls, v):
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters")
        return v


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: UserRole


class UserResponse(BaseModel):
    id: str
    email: str
    full_name: str
    role: UserRole
    created_at: datetime

    model_config = {"from_attributes": True}


# ── Course schemas ─────────────────────────────────────────────────────────────
class CourseCreate(BaseModel):
    title: str
    description: Optional[str] = None
    category: Optional[str] = None


class CourseUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    is_published: Optional[bool] = None


class CourseResponse(BaseModel):
    id: str
    title: str
    description: Optional[str]
    category: Optional[str]
    is_published: bool
    created_by: str
    created_at: datetime
    lesson_count: Optional[int] = 0

    model_config = {"from_attributes": True}


# ── Lesson schemas ─────────────────────────────────────────────────────────────
class LessonCreate(BaseModel):
    title: str
    order: int
    content_type: ContentType
    content_body: str


class LessonUpdate(BaseModel):
    title: Optional[str] = None
    order: Optional[int] = None
    content_type: Optional[ContentType] = None
    content_body: Optional[str] = None


class LessonResponse(BaseModel):
    id: str
    course_id: str
    title: str
    order: int
    content_type: ContentType
    content_body: str
    created_at: datetime


# ── Progress schemas ───────────────────────────────────────────────────────────
class ProgressResponse(BaseModel):
    user_id: str
    course_id: str
    completed_lessons: List[str]
    total_lessons: int
    last_accessed: datetime
    completed_at: Optional[datetime]

    @property
    def percentage(self) -> float:
        if self.total_lessons == 0:
            return 0.0
        return round(len(self.completed_lessons) / self.total_lessons * 100, 1)


# ── Audit log schema ───────────────────────────────────────────────────────────
class AuditLogResponse(BaseModel):
    id: str
    user_id: Optional[str]
    action: str
    resource: Optional[str]
    resource_id: Optional[str]
    ip_address: Optional[str]
    detail: Optional[str]
    timestamp: datetime

    model_config = {"from_attributes": True}