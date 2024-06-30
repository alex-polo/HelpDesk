import contextlib

from sqlalchemy import delete, sql
from sqlalchemy.sql import dml

from src.auth import create_system_user
from src.config import SystemUserConfig
from src.database import get_async_session
from src.models import User


async def delete_user(stmt: sql.dml):
    get_async_session_context = contextlib.asynccontextmanager(get_async_session)
    async with get_async_session_context() as session:
        await session.execute(stmt)
        await session.commit()


async def update_admin_user(admin_user_config: SystemUserConfig) -> None:
    stmt = delete(User).where(User.is_superuser == True)
    await delete_user(stmt=stmt)
    await create_system_user(email=admin_user_config.username,
                             password=admin_user_config.password,
                             is_superuser=True,
                             is_tg_bot=False)


async def update_bot_user(bot_user_config: SystemUserConfig) -> None:
    stmt = delete(User).where(User.is_tg_bot == True)
    await delete_user(stmt=stmt)
    await create_system_user(email=bot_user_config.username,
                             password=bot_user_config.password,
                             is_superuser=False,
                             is_tg_bot=True)
