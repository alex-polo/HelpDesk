import logging
from typing import List

import fastapi
from asyncpg import UniqueViolationError
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select, insert, update
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth.manager import current_active_user
from src.auth.schemes import UserRead
from src.database import get_async_session
from src.models import User, TGUser, Object, Organization, UserOrganization, OrganizationUserRole
from src.schemes import (TGUserResponseModel,
                         CreateOrganizationQuery,
                         OrganizationResponse,
                         ObjectResponse,
                         CreateObjectQuery, UserOrganizationsResponse)

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


@frontend_router.post("/create-organization",
                      responses={
                          # 201: {'description': 'Creation organization is success'},
                          409: {"description": "Organization already exists", },
                          403: {"description": "User is not superuser", },
                          500: {"description": "Internal error server", }
                      },
                      status_code=fastapi.status.HTTP_201_CREATED)
async def create_organization(value: CreateOrganizationQuery,
                              session: AsyncSession = Depends(get_async_session),
                              user: User = Depends(current_active_user)):
    if user.is_superuser is False:
        raise HTTPException(status_code=fastapi.status.HTTP_403_FORBIDDEN, detail="User is not superuser")
    try:
        await session.execute(insert(Organization).values(name=value.name,
                                                          short_name=value.short_name,
                                                          address=value.address,
                                                          inn=value.inn,
                                                          supervisor=value.supervisor,
                                                          description=value.description))

        await session.commit()
    except IntegrityError as error:
        print(error)
        raise HTTPException(status_code=fastapi.status.HTTP_409_CONFLICT, detail="Organization already exists")
    except Exception as error:
        print(error)
        raise HTTPException(status_code=fastapi.status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal error server")


@frontend_router.post("/update-organization",
                      status_code=fastapi.status.HTTP_200_OK)
async def update_organization(value: OrganizationResponse,
                              session: AsyncSession = Depends(get_async_session),
                              user: User = Depends(current_active_user)):
    if user.is_superuser is False:
        raise HTTPException(status_code=fastapi.status.HTTP_403_FORBIDDEN)
    try:
        await session.execute(update(Organization).values(name=value.name,
                                                          short_name=value.short_name,
                                                          address=value.address,
                                                          inn=value.inn,
                                                          supervisor=value.supervisor,
                                                          description=value.description,
                                                          is_active=value.is_active).filter_by(id=value.id))
        await session.commit()
    except IntegrityError as error:
        print(error)
        raise HTTPException(status_code=fastapi.status.HTTP_409_CONFLICT)
    except Exception as error:
        print(error)


@frontend_router.get("/get-organization",
                     status_code=fastapi.status.HTTP_200_OK, response_model=List[UserOrganizationsResponse])
async def get_organization(session: AsyncSession = Depends(get_async_session),
                           user: User = Depends(current_active_user)):
    if user.is_superuser is False:
        raise HTTPException(status_code=fastapi.status.HTTP_403_FORBIDDEN)

    user_organizations_response = list()
    for organization_id, role_id in (await session.execute(
            select(UserOrganization.organization_id,
                   UserOrganization.role_id).where(UserOrganization.user_id == user.id))).all():
        user_organizations_response.append(
            UserOrganizationsResponse(
                organization=OrganizationResponse.model_validate(
                    (await session.execute(select(Organization).where(Organization.id == organization_id))).scalar(),
                    from_attributes=True),
                role=(await session.execute(
                    select(OrganizationUserRole.role_name).where(OrganizationUserRole.id == role_id))).scalar()
            )
        )

    return user_organizations_response


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


@frontend_router.get("/get-all-users",
                     status_code=fastapi.status.HTTP_200_OK, response_model=List[UserRead])
async def get_all_users(session: AsyncSession = Depends(get_async_session),
                        # user: User = Depends(current_active_user)
                        ):
    # if user.is_superuser is False:
    #     raise HTTPException(status_code=fastapi.status.HTTP_403_FORBIDDEN)

    user_list = [UserRead.model_validate(row, from_attributes=True)
            for row in (await session.execute(select(User))).scalars().all()]
    new_user_list = list()
    for _ in range(0, 1000):
        new_user_list.append(user_list[0])
        new_user_list.append(user_list[1])
    return new_user_list
