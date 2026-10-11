from fastapi import APIRouter, Depends

from app.modules.auth.dependencies import get_optional_user
from app.modules.users.dependencies import get_user_service
from app.modules.users.models import User
from app.modules.users.schemas import UserProfile
from app.modules.users.service import UserService


router = APIRouter()


@router.get(
    "/{username}",
    response_model=UserProfile,
)
def get_profile(
    username: str,
    viewer: User | None = Depends(get_optional_user),
    service: UserService = Depends(get_user_service),
):
    return service.get_profile(username, viewer)
