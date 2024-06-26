import logging

import fastapi
from fastapi import APIRouter, Depends, UploadFile
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth.manager import current_active_user
from src.database import get_async_session
from src.models import User
from src.schemes import TgUserRequest, TgUserRoleResponse, TgAppealParamsResponse, TgAppealRequest, \
    TgAppealChannelTaskIDRequest, TgAppealCreateTaskIDResponse

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
        object=["СберТауэр"],
        subject=["А", "Б", "Г", "Е", "Стилобат"],
        system=["СПС", "СПА", "СОУЭ", "СКУД"],
        incident=["Сработка", "Неисправность"],
        priority=["Средний", "Высокий", "Критичный"],
    )


@telegram_router.post("/tg-create-appeal",
                      status_code=fastapi.status.HTTP_201_CREATED,
                      response_model=TgAppealCreateTaskIDResponse)
async def tg_create_appeal(request: TgAppealRequest,
                           file: UploadFile,
                           session: AsyncSession = Depends(get_async_session),
                           user: User = Depends(current_active_user)):
    return TgAppealCreateTaskIDResponse(
        task_id='TASK123456'
    )


@telegram_router.post("/tg-update-appeal-chanel-post-id",
                      status_code=fastapi.status.HTTP_202_ACCEPTED)
async def tg_update_appeal_chanel_post_id(request: TgAppealChannelTaskIDRequest,
                                          session: AsyncSession = Depends(get_async_session),
                                          user: User = Depends(current_active_user)):
    pass
