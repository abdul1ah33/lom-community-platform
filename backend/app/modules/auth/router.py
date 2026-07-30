from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.modules.auth.service import AuthService
from app.modules.users.schemas import UserCreate, UserResponse

from app.modules.auth.dependencies import get_auth_service

from backend.app.core.api.responses import SuccessResponse


router = APIRouter()


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=201,
)
def register(
    data: UserCreate,
    service: AuthService = Depends(get_auth_service),
):
    user = service.register(data)

    response = UserResponse.model_validate(user)

    return SuccessResponse(
        status_code=201,
        message="User registered successfully.",
        data=response.model_dump(),
    )