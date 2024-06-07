import uuid
from typing import Optional

from fastapi_users import schemas
from pydantic import EmailStr


class UserRead(schemas.BaseUser[uuid.UUID]):
    pass


class UserCreate(schemas.BaseUserCreate):
    pass


class UserUpdate(schemas.BaseUserUpdate):
    email: Optional[EmailStr] = None
    username: Optional[str] = None
    tg_id: Optional[int] = None
    password: Optional[str] = None
    # phone_number: Mapped[str] = mapped_column(String(20), nullable=True, unique=True)
    is_active: Optional[bool] = None
    is_superuser: Optional[bool] = None
    is_verified: Optional[bool] = None

    # tg_id: Mapped[int] = mapped_column(Integer, nullable=True, unique=False)
    # hashed_password: Mapped[str] = mapped_column(String(1024), nullable=False, unique=False)
    # is_system_admin: Mapped[bool] = mapped_column(Boolean, nullable=False, unique=False)
