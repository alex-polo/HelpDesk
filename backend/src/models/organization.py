from typing import Optional, List

from sqlalchemy import Integer, String, Boolean
from sqlalchemy.orm import mapped_column, Mapped, relationship

from .users_organization import UserOrganization
from .base import Base


class Organization(Base):
    __tablename__ = "organizations"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    address: Mapped[str] = mapped_column(String(255), nullable=True, unique=False)
    inn: Mapped[int] = mapped_column(Integer, nullable=True, unique=True)
    supervisor: Mapped[str] = mapped_column(String(255), nullable=False, unique=False)
    description: Mapped[str] = mapped_column(String(255), nullable=True, unique=False)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, unique=False, default=True)

    # users: Mapped[List["User"]] = relationship(secondary=UserOrganization, back_populates="users")
    users: Mapped[List["UserOrganization"]] = relationship(back_populates="organizations")
