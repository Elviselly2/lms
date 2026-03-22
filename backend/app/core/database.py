from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

# ── PostgreSQL (SQLAlchemy async) ──────────────────────────────────────────────
engine = create_async_engine(settings.DATABASE_URL, echo=settings.DEBUG)
AsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False)


class Base(DeclarativeBase):
    pass


async def get_db() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        yield session


async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


# ── MongoDB (Motor async) ──────────────────────────────────────────────────────
mongo_client: AsyncIOMotorClient = None


def get_mongo_client() -> AsyncIOMotorClient:
    return mongo_client


def get_mongo_db():
    return mongo_client[settings.MONGO_DB]


async def init_mongo():
    global mongo_client
    mongo_client = AsyncIOMotorClient(settings.MONGO_URL)
    db = mongo_client[settings.MONGO_DB]
    # Create indexes for fast lookups
    await db.lessons.create_index("course_id")
    await db.progress.create_index([("user_id", 1), ("course_id", 1)], unique=True)