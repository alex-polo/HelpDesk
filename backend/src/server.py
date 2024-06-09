import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from starlette.middleware.httpsredirect import HTTPSRedirectMiddleware

from src.auth import auth_router
from src.services.startup import update_admin_user, update_bot_user

logger = logging.getLogger(__name__)

origins = [
    "https://127.0.0.1",
    "https://localhost",
    "https://developer.host",
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
    yield
    pass


app = FastAPI(
    title='LOGika',
    version=get_version_app(),
    lifespan=lifespan
)

app.include_router(auth_router)
# app.include_router(public_router)
# app.include_router(private_router)


app.add_middleware(HTTPSRedirectMiddleware, )
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def on_startup() -> None:
    """
    Функция выполняется при старте сервиса
    :return: None
    """
    logger.info('Update system users')
    bot_user_config =
    update_admin_user()
    update_bot_user()



@app.on_event('shutdown')
def on_shutdown() -> None:
    """ Функция выполняется при остановке сервиса """
    pass
