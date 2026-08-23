from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.database import Base

from datetime import datetime

from uuid import UUID, uuid4


class User(Base):
    __tablename__ = "users"

    id: Mapped[UUID] = mapped_column(
        primary_key=True,
        default=uuid4,
    )

    username: Mapped[str] = mapped_column(
        String(50),
        unique=True,
        nullable=False
    )

    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        nullable=False
    )

    password_hash: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    avatar_url: Mapped[str] = mapped_column(
        String(255),
        nullable=True
    )

    bio: Mapped[str] = mapped_column(
        String(500),
        nullable=True
    )

    # favorite_character_id: Mapped[int] = mapped_column(
    #     nullable=True
    # )

    # favorite_pathway_id: Mapped[int] = mapped_column(
    #     nullable=True
    # )

    # role_id: Mapped[int] = mapped_column(
    #     nullable=False
    # )

    # status: Mapped[str] = mapped_column(
    #     String(20),
    #     nullable=False
    # )

    created_at: Mapped[datetime] = mapped_column(
        nullable=False,
        default=datetime.utcnow
    )

    updated_at: Mapped[datetime] = mapped_column(
        nullable=False,
        default=datetime.utcnow
    )