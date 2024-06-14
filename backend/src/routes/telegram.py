import logging

import fastapi
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth.manager import current_active_user
from src.database import get_async_session
from src.models import User
from src.schemes import TgUserRequest, TgUserRoleResponse, TgAppealParamsResponse

logger = logging.getLogger(__name__)

telegram_router = APIRouter(
    prefix='/telegram',
    tags=["telegram"],
)


@telegram_router.post("/tg-user-role", status_code=fastapi.status.HTTP_200_OK, response_model=TgUserRoleResponse)
async def tg_user_role(tg_user_request: TgUserRequest,
                       session: AsyncSession = Depends(get_async_session),
                       user: User = Depends(current_active_user)):
    return TgUserRoleResponse(role='Инженер')


@telegram_router.post("/tg-user-appeal-params",
                      status_code=fastapi.status.HTTP_200_OK,
                      response_model=TgAppealParamsResponse)
async def tg_user_appeal_params(tg_user_request: TgUserRequest,
                                session: AsyncSession = Depends(get_async_session),
                                user: User = Depends(current_active_user)):
    return TgAppealParamsResponse(
        building=['A', 'B'],
        system=['СПС', 'СПА', 'СОУЭ'],
        incident=['сработка', 'неисправность'],
        priority=['средний', 'высокий', 'критичный'],
    )
