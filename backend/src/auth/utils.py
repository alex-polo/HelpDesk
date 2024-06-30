import contextlib

from src.database import get_async_session
from .manager import get_user_manager, get_user_db
from .schemes import UserCreate


async def create_system_user(email: str, password: str, is_superuser: bool = False, is_tg_bot: bool = False) -> None:
    get_async_session_context = contextlib.asynccontextmanager(get_async_session)
    get_user_db_context = contextlib.asynccontextmanager(get_user_db)
    get_user_manager_context = contextlib.asynccontextmanager(get_user_manager)

    async with get_async_session_context() as session:
        async with get_user_db_context(session) as user_db:
            async with get_user_manager_context(user_db) as user_manager:
                await user_manager.create(UserCreate(email=email,
                                                     password=password,
                                                     is_superuser=is_superuser,
                                                     is_tg_bot=is_tg_bot,
                                                     is_active=True,
                                                     is_verified=True))
