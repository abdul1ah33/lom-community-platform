from app.core.api.exceptions import UserNotFoundException

from app.modules.users.models import User
from app.modules.users.repository import UserRepository
from app.modules.users.schemas import (
    Achievement,
    ProfileStats,
    ReadingProgress,
    UserProfile,
    ViewerRelation,
)


class UserService:
    def __init__(self, user_repo: UserRepository):
        self.user_repository = user_repo


    def get_profile(
        self,
        username: str,
        viewer: User | None,
    ) -> UserProfile:

        user = self.user_repository.get_by_username_ci(username)

        if not user:
            raise UserNotFoundException()

        return self._to_profile(user, viewer)


    def _to_profile(
        self,
        user: User,
        viewer: User | None,
    ) -> UserProfile:

        return UserProfile(
            id=user.id,
            username=user.username,
            display_name=user.display_name,
            avatar_url=user.avatar_url,
            bio=user.bio,
            location=user.location,
            favorite_character=user.favorite_character,
            favorite_pathway=user.favorite_pathway,
            reading_progress=ReadingProgress(
                current_chapter=user.current_chapter,
                updated_at=user.progress_updated_at,
            ),
            joined_at=user.created_at,
            # Filled in as the follows / posts / comments modules land.
            stats=ProfileStats(),
            achievements=compute_achievements(user),
            viewer=ViewerRelation(
                is_self=viewer is not None and viewer.id == user.id,
                # Becomes a real lookup once the follows table exists.
                is_following=False,
            ),
        )


def compute_achievements(user: User) -> list[Achievement]:
    # TODO (exercise): see docs/api-contracts/profiles.md "achievements".
    return []
