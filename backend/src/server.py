import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from starlette.middleware.httpsredirect import HTTPSRedirectMiddleware

from src.auth import auth_router
from src.config import SystemUserConfig, get_bot_user_config, get_admin_user_config, StorageConfig, get_storage_config
from src.routes import telegram_router, frontend_router
from src.services.startup import update_admin_user, update_bot_user, verify_storage

logger = logging.getLogger(__name__)

origins = [
    "https://127.0.0.1:5173",
    "http://127.0.0.1:5173",
    "https://developer.host:5173",
    "http://developer.host:5173",
    "http://localhost:5173",
    "https://localhost:5173",
    "https://objectus.ru"
]


def get_version_app() -> str:
    try:
        with open('version.txt', 'r') as file:
            return file.read()
    except Exception as error:
        logger.error(error)
        return 'no-version'


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info('Start startup events')
    await on_startup()
    yield
    logger.info('lifespan end')


app = FastAPI(
    title='HelpDesk',
    version=get_version_app(),
    lifespan=lifespan
)

app.include_router(auth_router)
app.include_router(telegram_router)
app.include_router(frontend_router)


app.add_middleware(HTTPSRedirectMiddleware, )
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


# @app.on_event("startup")
async def on_startup() -> None:
    """
    Функция выполняется при старте сервиса
    :return: None
    """
    logger.info('Configuration system users')
    admin_user_config: SystemUserConfig = get_admin_user_config()
    bot_user_config: SystemUserConfig = get_bot_user_config()

    if admin_user_config.resetting_user:
        await update_admin_user(admin_user_config=admin_user_config)

    if bot_user_config.resetting_user:
        await update_bot_user(bot_user_config=bot_user_config)
    logger.info('Configuration system users is success')

    logger.info('Configuration storage')
    storage_config: StorageConfig = get_storage_config()
    verify_storage(storage_config=storage_config)
    logger.info('Configuration storage is success')


# @app.on_event('shutdown')/
def on_shutdown() -> None:
    """ Функция выполняется при остановке сервиса """
    pass
