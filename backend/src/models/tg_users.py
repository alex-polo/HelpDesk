from sqlalchemy import Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base


class TGUser(Base):
    __tablename__ = "tg_users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    tg_id: Mapped[int] = mapped_column(Integer, nullable=True, unique=True)
    first_name: Mapped[str] = mapped_column(String(50), nullable=False, unique=False)
    second_name: Mapped[str] = mapped_column(String(50), nullable=False, unique=False)
    surname: Mapped[str] = mapped_column(String(50), nullable=False, unique=False)
    phone_number_tg: Mapped[str] = mapped_column(String(20), nullable=True, unique=True)
    phone_number_human: Mapped[str] = mapped_column(String(20), nullable=True, unique=True)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, unique=False, default=True)

    role_id: Mapped[int] = mapped_column(ForeignKey("tg_roles.id"))
    tg_role: Mapped["TGRoles"] = relationship(back_populates="tg_users")
