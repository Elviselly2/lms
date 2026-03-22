from typing import Optional
from fastapi import Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from app.models.sql_models import AuditLog


async def log_action(
    db: AsyncSession,
    action: str,
    user_id: Optional[str] = None,
    resource: Optional[str] = None,
    resource_id: Optional[str] = None,
    detail: Optional[str] = None,
    request: Optional[Request] = None,
):
    """Write an audit entry. Call this after every meaningful state change."""
    ip = None
    if request:
        forwarded = request.headers.get("X-Forwarded-For")
        ip = forwarded.split(",")[0] if forwarded else request.client.host

    entry = AuditLog(
        user_id=user_id,
        action=action,
        resource=resource,
        resource_id=resource_id,
        ip_address=ip,
        detail=detail,
    )
    db.add(entry)
    await db.commit()


async def get_audit_logs(db: AsyncSession, limit: int = 100, offset: int = 0):
    result = await db.execute(
        select(AuditLog).order_by(desc(AuditLog.timestamp)).limit(limit).offset(offset)
    )
    return result.scalars().all()