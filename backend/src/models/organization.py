from typing import Optional

from sqlalchemy import Integer, String, Boolean
from sqlalchemy.orm import mapped_column, Mapped

from .base import Base


class Organization(Base):
    __tablename__ = "organization"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    address: Mapped[Optional[str]] = mapped_column(String(255), nullable=True, unique=False)
    inn: Mapped[Optional[int]] = mapped_column(Integer, unique=True)
    supervisor: Mapped[str] = mapped_column(String(255), nullable=False, unique=False)
    description: Mapped[Optional[str]] = mapped_column(String(255), nullable=True, unique=False)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, unique=False, default=True)
