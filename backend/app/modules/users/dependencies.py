from fastapi import Depends

from app.modules.auth.dependencies import get_user_repository
from app.modules.users.repository import UserRepository
from app.modules.users.service import UserService


def get_user_service(
    user_repository: UserRepository = Depends(get_user_repository),
) -> UserService:
    return UserService(user_repository)
