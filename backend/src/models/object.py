from sqlalchemy import Integer, String
from sqlalchemy.orm import mapped_column, Mapped

from .base import Base


class Object(Base):
    __tablename__ = "object"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False, unique=False)
