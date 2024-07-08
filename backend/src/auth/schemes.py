from typing import Optional

from fastapi_users import schemas, models
from pydantic import EmailStr


class UserRead(schemas.BaseUser[int]):
    id: models.ID
    email: EmailStr
    first_name: Optional[str]
    second_name: Optional[str]
    surname: Optional[str]
    is_active: Optional[bool]
    is_superuser: Optional[bool]
    is_tg_bot: Optional[bool]
    is_verified: Optional[bool]
    # id: models.ID
    # email: EmailStr
    # is_active: Optional[bool]
    # is_superuser: Optional[bool]
    # is_tg_bot: Optional[bool]
    # is_verified: Optional[bool]


class UserCreate(schemas.BaseUserCreate):
    email: EmailStr
    password: str
    is_active: Optional[bool] = False
    is_superuser: Optional[bool] = False
    is_tg_bot: Optional[bool] = False
    is_verified: Optional[bool] = False


class UserUpdate(schemas.BaseUserUpdate):
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    is_active: Optional[bool] = None
    is_superuser: Optional[bool] = None
    is_tg_bot: Optional[bool] = None
    is_verified: Optional[bool] = None
