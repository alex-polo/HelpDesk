from typing import Optional

from sqlalchemy import Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base


class Subject(Base):
    __tablename__ = "subject"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False, unique=False)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, unique=False, default=True)
    object_id: Mapped[int] = mapped_column(ForeignKey("object.id"))


    # role_id: Mapped[int] = mapped_column(ForeignKey("tg_roles.id"))
    # tg_role: Mapped["TGRoles"] = relationship(back_populates="tg_users")