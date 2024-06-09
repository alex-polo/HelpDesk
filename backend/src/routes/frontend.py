import logging

import fastapi
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth.manager import current_active_user
from src.database import get_async_session
from src.models import User, TGUser
from src.schemes import TGUserResponseModel

logger = logging.getLogger(__name__)

frontend_router = APIRouter(
    prefix='/frontend',
    tags=["frontend"],
)


@frontend_router.get("/get_tg_users", status_code=fastapi.status.HTTP_200_OK, response_model=TGUserResponseModel)
async def get_tg_users(session: AsyncSession = Depends(get_async_session),
                       user: User = Depends(current_active_user)):

    if user.is_superuser is False:
        raise HTTPException(status_code=fastapi.status.HTTP_401_UNAUTHORIZED)

    return await session.execute(select(TGUser))
