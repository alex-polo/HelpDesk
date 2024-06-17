import logging
from typing import List

import fastapi
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth.manager import current_active_user
from src.database import get_async_session
from src.models import User, TGUser, Object
from src.schemes import TGUserResponseModel, QueryValue, ObjectResponse

logger = logging.getLogger(__name__)

frontend_router = APIRouter(
    prefix='/frontend',
    tags=["frontend"],
)


@frontend_router.get("/get-tg-users", status_code=fastapi.status.HTTP_200_OK, response_model=TGUserResponseModel)
async def get_tg_users(session: AsyncSession = Depends(get_async_session),
                       user: User = Depends(current_active_user)):
    if user.is_superuser is False:
        raise HTTPException(status_code=fastapi.status.HTTP_401_UNAUTHORIZED)

    return await session.execute(select(TGUser))


@frontend_router.post("/create-object",
                      status_code=fastapi.status.HTTP_201_CREATED)
async def create_object(value: QueryValue,
                        session: AsyncSession = Depends(get_async_session),
                        user: User = Depends(current_active_user)):
    if user.is_superuser is False:
        raise HTTPException(status_code=fastapi.status.HTTP_403_FORBIDDEN)
    print(value)
    return await session.execute(select(TGUser))


@frontend_router.get("/get-objects",
                     status_code=fastapi.status.HTTP_200_OK, response_model=List[ObjectResponse])
async def get_objects(session: AsyncSession = Depends(get_async_session),
                      user: User = Depends(current_active_user)):
    if user.is_superuser is False:
        raise HTTPException(status_code=fastapi.status.HTTP_403_FORBIDDEN)
    # return (await session.execute(select(Object))).all()
    return [ObjectResponse(id=1, name='Сбербанк'), ObjectResponse(id=2, name='МТС')]
