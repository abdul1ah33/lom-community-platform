from fastapi import APIRouter, Depends

from app.modules.auth.service import AuthService
from app.modules.auth.schemas import (
    LoginRequest,
    TokenResponse,
    RefreshTokenRequest
)
from app.modules.auth.dependencies import get_auth_service, get_current_user

from app.modules.users.schemas import UserCreate, UserResponse

from app.core.api.responses import SuccessResponse
from app.modules.users.models import User


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
        data=response.model_dump(mode="json"),
    )


@router.post(
    "/login",
    response_model=TokenResponse,
)
def login(
    data: LoginRequest,
    service: AuthService = Depends(get_auth_service)
):
    
    return service.login(data)


@router.get(
    "/me",
    response_model=UserResponse,
)
def get_current_user_profile(
    current_user: User = Depends(get_current_user)
):
    return UserResponse.model_validate(current_user)


@router.post(
    "/logout",
    status_code=204,
)
def logout(
    data: RefreshTokenRequest,
    service: AuthService = Depends(get_auth_service),
):
    service.logout(data)


@router.post(
    "/refresh",
    response_model=TokenResponse,
)
def refresh(
    data: RefreshTokenRequest,
    service: AuthService = Depends(get_auth_service),
):
    return service.refresh_token(data)