from typing import List

from sqlalchemy import Integer, String, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base


class TGRoles(Base):
    __tablename__ = "tg_roles"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False, unique=True)
    tg_users: Mapped[List['TGUser']] = relationship(back_populates="child")
