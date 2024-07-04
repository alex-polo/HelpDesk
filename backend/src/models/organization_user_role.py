from typing import List

from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.models import Base


class OrganizationUserRole(Base):
    __tablename__ = 'organization_user_role'

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    role_name: Mapped[str] = mapped_column(String(100), unique=False, nullable=False)

    organization_users: Mapped[List["UserOrganization"]] = relationship(back_populates="user_role")



