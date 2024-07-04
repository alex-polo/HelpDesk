from typing import Optional

from sqlalchemy import ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base


class UserOrganization(Base):
    __tablename__ = 'users_organizations'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, unique=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), primary_key=True)
    organization_id: Mapped[int] = mapped_column(ForeignKey('organizations.id'), primary_key=True)
    role_id: Mapped[int] = mapped_column(ForeignKey("organization_user_role.id"), primary_key=True)

    # user_id: Mapped[Optional[int]] = mapped_column(ForeignKey("child_table.id"))
    users: Mapped[Optional["User"]] = relationship(back_populates="organizations")
    organizations: Mapped[Optional["Organization"]] = relationship(back_populates="users")
    user_role: Mapped["OrganizationUserRole"] = relationship(back_populates="organization_users")
