import logging
from typing import List

import fastapi
from asyncpg import UniqueViolationError
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select, insert
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth.manager import current_active_user
from src.database import get_async_session
from src.models import User, TGUser, Object
from src.schemes import TGUserResponseModel, ObjectResponse, CreateObjectQuery

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
async def create_object(value: CreateObjectQuery,
                        session: AsyncSession = Depends(get_async_session),
                        user: User = Depends(current_active_user)):
    # if user.is_superuser is False:
    #     raise HTTPException(status_code=fastapi.status.HTTP_403_FORBIDDEN)
    try:
        await session.execute(insert(Object).values(name=value.name, description=value.description))
        await session.commit()
    except IntegrityError as error:
        print(error)
        raise HTTPException(status_code=fastapi.status.HTTP_409_CONFLICT)
    except Exception as error:
        print(error)




@frontend_router.get("/get-objects",
                     status_code=fastapi.status.HTTP_200_OK, response_model=List[ObjectResponse])
async def get_objects(session: AsyncSession = Depends(get_async_session),
                      user: User = Depends(current_active_user)):
    if user.is_superuser is False:
        raise HTTPException(status_code=fastapi.status.HTTP_403_FORBIDDEN)

    return [ObjectResponse.model_validate(row, from_attributes=True)
            for row in (await session.execute(select(Object))).scalars().all()]
