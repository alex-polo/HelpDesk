from fastapi_users_db_sqlalchemy import SQLAlchemyBaseUserTable
from sqlalchemy import Integer, String, Boolean
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base


class User(SQLAlchemyBaseUserTable[int], Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    username: Mapped[int] = mapped_column(String(50), nullable=False, unique=True)
    email: Mapped[int] = mapped_column(String(50), nullable=True, unique=True)
    # tg_phone_number: Mapped[str] = mapped_column(String(20), nullable=True, unique=True)
    phone_number: Mapped[str] = mapped_column(String(20), nullable=True, unique=True)
    tg_id: Mapped[int] = mapped_column(Integer, nullable=True, unique=False)
    hashed_password: Mapped[str] = mapped_column(String(1024), nullable=False, unique=False)
    is_system: Mapped[bool] = mapped_column(Boolean, nullable=False, unique=False)
    is_admin: Mapped[bool] = mapped_column(Boolean, nullable=False, unique=False)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, unique=False, default=True)
    is_superuser: Mapped[bool] = mapped_column(Boolean, nullable=False, unique=False, default=False)
    is_verified: Mapped[bool] = mapped_column(Boolean, nullable=False, unique=False, default=False)
