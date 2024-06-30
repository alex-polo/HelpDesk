import logging
from typing import List, Optional

import fastapi
from fastapi import APIRouter, Depends, UploadFile
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth.manager import current_active_user
from src.database import get_async_session
from src.models import User
from src.schemes import (TgUserRequest,
                         TgUserRoleResponse,
                         TgAppealParamsResponse,
                         TgAppealRequest,
                         TgAppealChannelTaskIDRequest,
                         TgAppealCreateTaskIDResponse, TgContactsResponse, TgCloseAppealRequest, TgAppealsRequest,
                         TgAppealsResponse)

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
        object=["СберСити"],
        subject=["А", "Б", "Г", "Е", "Стилобат"],
        system=["СПС", "СПА", "СОУЭ", "СКУД"],
        incident=["Сработка", "Неисправность"],
        priority=["Средний", "Высокий", "Критичный"],
    )


@telegram_router.post("/tg-create-appeal",
                      status_code=fastapi.status.HTTP_201_CREATED,
                      response_model=TgAppealCreateTaskIDResponse)
async def tg_create_appeal(request: TgAppealRequest,
                           session: AsyncSession = Depends(get_async_session),
                           user: User = Depends(current_active_user)):
    return TgAppealCreateTaskIDResponse(
        task_id='TASK123456',
        user_list=[1344084119, 186208978, 223663162]
    )


@telegram_router.post("/tg-appeal-add-photo",
                      status_code=fastapi.status.HTTP_201_CREATED)
async def tg_appeal_add_photo(file: UploadFile,
                              session: AsyncSession = Depends(get_async_session),
                              user: User = Depends(current_active_user)):
    filename: str = file.filename.split('%2F')[1]
    task_id: str = filename.split('.')[0]
    with open(filename, "wb") as f:
        f.write(file.file.read())
    print(file)
    return {file.filename}


@telegram_router.post("/tg-update-appeal-chanel-post-id",
                      status_code=fastapi.status.HTTP_202_ACCEPTED)
async def tg_update_appeal_chanel_post_id(request: TgAppealChannelTaskIDRequest,
                                          session: AsyncSession = Depends(get_async_session),
                                          user: User = Depends(current_active_user)):
    pass


@telegram_router.post("/tg-close-appeal",
                      status_code=fastapi.status.HTTP_202_ACCEPTED)
async def tg_close_appeal(request: TgCloseAppealRequest,
                          session: AsyncSession = Depends(get_async_session),
                          user: User = Depends(current_active_user)):
    pass


@telegram_router.post("/tg-get-appeals",
                      status_code=fastapi.status.HTTP_200_OK,
                      response_model=List[TgAppealsResponse])
async def tg_get_appeals(request: TgAppealsRequest,
                         session: AsyncSession = Depends(get_async_session),
                         user: User = Depends(current_active_user)):
    return [TgAppealsResponse(
        task_id='task_1',
        chanel_post_id=2,
        priority='критичный'
    ), ]


@telegram_router.get("/contacts",
                     status_code=fastapi.status.HTTP_200_OK,
                     response_model=List[TgContactsResponse])
async def contacts(request: TgUserRequest,
                   session: AsyncSession = Depends(get_async_session),
                   user: User = Depends(current_active_user)):
    return [TgContactsResponse(
        name='Антониан',
        phone='9117890510',
        role='Инженер'
    ), TgContactsResponse(
        name='Евкурий',
        phone='9117890511',
        role='Техник'
    )]
