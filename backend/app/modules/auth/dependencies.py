from fastapi import Depends
from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.modules.auth.service import AuthService
from app.modules.users.repository import UserRepository
from app.modules.auth.repository import RefreshTokenRepository

from fastapi.security import (
    HTTPAuthorizationCredentials,
    HTTPBearer,
)

from uuid import UUID

from app.core.api.exceptions import InvalidAccessTokenException
from app.core.auth.jwt import decode_token
from app.modules.users.models import User

bearer_scheme = HTTPBearer()


def get_user_repository(
    db: Session = Depends(get_db),
) -> UserRepository:
    return UserRepository(db)


def get_refresh_token_repository(
    db: Session = Depends(get_db),
) -> RefreshTokenRepository:
    return RefreshTokenRepository(db)


def get_auth_service(
    db: Session = Depends(get_db),
    user_repository: UserRepository = Depends(get_user_repository),
    refresh_token_repository: RefreshTokenRepository = Depends(get_refresh_token_repository),
) -> AuthService:
    return AuthService(db, user_repository, refresh_token_repository)


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(
        bearer_scheme
    ),
    user_repository: UserRepository = Depends(
        get_user_repository
    ),
) -> User:

    token = credentials.credentials

    try:
        payload = decode_token(token)
    except Exception:
        raise InvalidAccessTokenException()

    if payload.get("type") != "access":
        raise InvalidAccessTokenException()

    subject = payload.get("sub")

    if not subject:
        raise InvalidAccessTokenException()

    try:
        user_id = UUID(subject)
    except ValueError:
        raise InvalidAccessTokenException()

    user = user_repository.get_by_id(user_id)

    if not user:
        raise InvalidAccessTokenException()

    return user