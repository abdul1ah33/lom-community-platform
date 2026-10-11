from pydantic import BaseModel, ConfigDict, EmailStr, Field
from datetime import datetime
from uuid import UUID


class UserCreate(BaseModel):
    username: str = Field(min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    username: str
    email: EmailStr
    avatar_url: str | None = None
    bio: str | None = None

# Profile responses. Mirror beta_frontend/src/features/profile/types.ts
# (contract: docs/api-contracts/profiles.md); keep the two in sync.

class ReadingProgress(BaseModel):
    current_chapter: int
    updated_at: datetime | None = None


class ProfileStats(BaseModel):
    posts: int = 0
    comments: int = 0
    followers: int = 0
    following: int = 0
    likes_received: int = 0


class Achievement(BaseModel):
    code: str
    title: str
    description: str
    earned_at: datetime


class ViewerRelation(BaseModel):
    """How the signed-in viewer relates to the profile. All False when anonymous."""
    is_self: bool = False
    is_following: bool = False


class UserProfile(BaseModel):
    id: UUID
    username: str
    display_name: str | None = None
    avatar_url: str | None = None
    bio: str | None = None
    location: str | None = None
    favorite_character: str | None = None
    favorite_pathway: str | None = None
    reading_progress: ReadingProgress
    joined_at: datetime
    stats: ProfileStats
    achievements: list[Achievement]
    viewer: ViewerRelation
