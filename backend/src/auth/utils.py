import contextlib

from fastapi import Depends
from fastapi_users_db_sqlalchemy import SQLAlchemyUserDatabase
from sqlalchemy.ext.asyncio import AsyncSession

from src.database import get_async_session
from src.models import User
from .manager import get_user_manager





async def update_user(username: str, password: str, options: str = None) -> None:
    get_async_session_context = contextlib.asynccontextmanager(get_async_session)
    get_user_db_context = contextlib.asynccontextmanager(get_user_db)
    get_user_manager_context = contextlib.asynccontextmanager(get_user_manager)

    async with get_async_session_context() as session:
        async with get_user_db_context(session) as user_db:
            async with get_user_manager_context(user_db) as user_manager:
                #     await user_manager.update(user=user,
                #                               user_update=UserUpdate(auth=auth,
                #                                                      password=generate_password(6),
                #                                                      is_superuser=is_superuser))
                # except UserNotExists:
                pass


async def create_user(username: str, password: str, options: str = None) -> None:
    get_async_session_context = contextlib.asynccontextmanager(get_async_session)
    get_user_db_context = contextlib.asynccontextmanager(get_user_db)
    get_user_manager_context = contextlib.asynccontextmanager(get_user_manager)

    async with get_async_session_context() as session:
        async with get_user_db_context(session) as user_db:
            async with get_user_manager_context(user_db) as user_manager:
                # await user_manager.create(UserCreate(email=email,
                #                                      tg_id=tg_id,
                #                                      password=password,
                #                                      is_superuser=False))
                pass
