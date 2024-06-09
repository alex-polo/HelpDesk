from sqlalchemy import Integer, String, Boolean
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base


class TGUser(Base):
    __tablename__ = "tg_roles"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    tg_user_id: Mapped[int] = mapped_column(Integer, nullable=True, unique=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False, unique=False)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, unique=False, default=True)
