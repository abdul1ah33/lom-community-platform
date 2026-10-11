from sqlalchemy import DateTime, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.database import Base

from datetime import datetime, timezone

from uuid import UUID, uuid4


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


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

    # Profile fields (docs/api-contracts/profiles.md)
    display_name: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True
    )

    location: Mapped[str | None] = mapped_column(
        String(60),
        nullable=True
    )

    favorite_character: Mapped[str | None] = mapped_column(
        String(60),
        nullable=True
    )

    # A pathway slug such as "seer"; validated by the API, not the database.
    favorite_pathway: Mapped[str | None] = mapped_column(
        String(32),
        nullable=True
    )

    # Last chapter read; 0 = not started. Drives every spoiler check.
    current_chapter: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0,
        server_default="0"
    )

    progress_updated_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
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
        DateTime(timezone=True),
        nullable=False,
        default=utc_now
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=utc_now,
        onupdate=utc_now
    )