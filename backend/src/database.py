from typing import AsyncGenerator

from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, Session

from .config import DatabaseConfig, get_database_config

db_config: DatabaseConfig = get_database_config()
DATABASE_URL = (f'{db_config.DB_USER}:'
                f'{db_config.DB_PASS}@'
                f'{db_config.DB_HOST}:'
                f'{db_config.DB_PORT}/'
                f'{db_config.DB_NAME}')

engine = create_engine(f'postgresql+psycopg2://{DATABASE_URL}')
session_maker = sessionmaker(engine, class_=Session, expire_on_commit=False)

async_engine = create_async_engine(f'postgresql+asyncpg://{DATABASE_URL}')
async_session_maker = sessionmaker(async_engine, class_=AsyncSession, expire_on_commit=False)


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session
