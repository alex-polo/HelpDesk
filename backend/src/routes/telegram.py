import logging

import fastapi
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth.manager import current_active_user
from src.database import get_async_session
from src.models import User
from src.schemes import TgUserIsExistModel

logger = logging.getLogger(__name__)

telegram_router = APIRouter(
    prefix='/telegram',
    tags=["telegram"],
)


@telegram_router.post("/user_is_exist", status_code=fastapi.status.HTTP_200_OK, response_model=TgUserIsExistModel)
async def user_is_exist(tg_identifier: int,
                        session: AsyncSession = Depends(get_async_session),
                        user: User = Depends(current_active_user)) -> TgUserIsExistModel:
    return TgUserIsExistModel(is_exist=False)
    # return JSONResponse(
    #     status_code=fastapi.status.HTTP_200_OK,
    #     content={"is_exist": False},
    # )
