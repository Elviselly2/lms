from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import init_db, init_mongo, get_mongo_db
from app.core.security import get_current_user
from app.routers import auth, courses, lessons, progress
from app.models.sql_models import User, UserRole
from app.core.security import hash_password
from app.core.database import AsyncSessionLocal
from sqlalchemy import select


async def seed_admin():
    """Create a default admin user if none exists."""
    async with AsyncSessionLocal() as db:
        result = await db.execute(select(User).where(User.role == UserRole.admin))
        if not result.scalar_one_or_none():
            admin = User(
                email="admin@learnhub.com",
                hashed_password=hash_password("Admin1234!"),
                full_name="LMS Admin",
                role=UserRole.admin,
            )
            db.add(admin)
            await db.commit()
            print("✓ Default admin created: admin@learnhub.com / Admin1234!")


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await init_db()
    await init_mongo()
    await seed_admin()
    yield
    # Shutdown (nothing to clean up for now)


app = FastAPI(
    title=settings.APP_NAME,
    version="1.0.0",
    lifespan=lifespan,
)

# CORS — allow React dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(auth.router, prefix="/api")
app.include_router(courses.router, prefix="/api")
app.include_router(lessons.router, prefix="/api")
app.include_router(progress.router, prefix="/api")


@app.get("/api/health")
async def health():
    return {"status": "ok", "app": settings.APP_NAME}