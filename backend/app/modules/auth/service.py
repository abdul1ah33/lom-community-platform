from sqlalchemy.orm import Session

from app.core.logger import logger

from app.modules.users.models import User
from app.modules.users.schemas import UserCreate, UserResponse
from app.modules.users.repository import UserRepository

from app.core.api.exceptions import (
    UsernameAlreadyExistsException,
    EmailAlreadyExistsException,
    InvalidCredentialsException,
    InvalidRefreshTokenException,
    DatabaseSavingErrorException,
)

from datetime import datetime, timedelta, timezone

from app.core.auth.jwt import create_access_token
from app.core.auth.security import (
    hash_password,
    generate_refresh_token,
    hash_refresh_token,
    verify_password,
)

from app.modules.auth.models import RefreshToken
from app.modules.auth.repository import RefreshTokenRepository
from app.modules.auth.schemas import (
    LoginRequest,
    TokenResponse,
    RefreshTokenRequest,
)

from app.core.config.settings import settings


class AuthService:
    def __init__(
        self,
        db: Session,
        user_repo: UserRepository,
        refresh_token_repo: RefreshTokenRepository
    ):
        self.db = db
        self.user_repository = user_repo
        self.refresh_token_repository = refresh_token_repo


    def register(self, data: UserCreate) -> UserResponse:

        if self.user_repository.get_by_username(data.username):

            logger.warning(
                "Registration failed: username '%s' already exists.",
                data.username,
            )

            raise UsernameAlreadyExistsException()


        if self.user_repository.get_by_email(data.email):


            logger.warning(
                "Registration failed: email '%s' already exists.",
                data.email,
            )

            raise EmailAlreadyExistsException()

        user = User(
            username=data.username,
            email=data.email,
            password_hash=hash_password(data.password),
        )

        try:
            self.user_repository.create(user)
            self.db.commit()

        except Exception:
            self.db.rollback()

            logger.exception(
                "Unexpected error while registering user '%s'.",
                data.email,
            )

            raise

        logger.info(
            "User registered successfully (id=%s, username=%s, email=%s)",
            user.id,
            user.username,
            user.email,
        )

        return UserResponse.model_validate(user)


    def login(
        self,
        data: LoginRequest,
    ) -> TokenResponse:

        user = self.user_repository.get_by_email(
            data.email
        )

        if not user:
            logger.warning(
                "Login failed: user with email '%s' was not found.",
                data.email,
            )

            raise InvalidCredentialsException()

        if not verify_password(
            data.password,
            user.password_hash,
        ):
            logger.warning(
                "Login failed: invalid password for email '%s'.",
                data.email,
            )

            raise InvalidCredentialsException()

        access_token = create_access_token(
            subject=str(user.id)
        )

        refresh_token = generate_refresh_token()

        refresh_token_record = RefreshToken(
            user_id=user.id,
            token_hash=hash_refresh_token(refresh_token),
            expires_at=(
                datetime.now(timezone.utc)
                + timedelta(
                    days=settings.refresh_token_expire_days
                )
            ),
        )

        try:
            self.refresh_token_repository.create(
                refresh_token_record
            )

            self.db.commit()

        except Exception:
            self.db.rollback()

            logger.exception(
                "Unexpected error while logging in user '%s'.",
                user.id,
            )

            raise

        logger.info(
            "User logged in successfully | id=%s | email=%s",
            user.id,
            user.email,
        )

        return TokenResponse(
            access_token=access_token,
            refresh_token=refresh_token,
        )


    def logout(
        self,
        data: RefreshTokenRequest,
    ) -> None:

        token_hash = hash_refresh_token(
            data.refresh_token
        )

        refresh_token = (
            self.refresh_token_repository.get_by_token_hash(
                token_hash
            )
        )

        if not refresh_token:
            logger.warning(
                "Logout failed: refresh token was not found."
            )

            raise InvalidRefreshTokenException()

        if refresh_token.revoked_at is not None:
            logger.warning(
                "Logout requested for already revoked "
                "refresh token %s.",
                refresh_token.id,
            )

            return

        self.refresh_token_repository.revoke(
            refresh_token
        )

        try:
            self.db.commit()

        except Exception:
            self.db.rollback()

            logger.exception(
                "Unexpected error while logging out "
                "user '%s'.",
                refresh_token.user_id,
            )

            raise DatabaseSavingErrorException()

        logger.info(
            "User logged out successfully | user_id=%s",
            refresh_token.user_id,
        )


    def refresh_token(
        self,
        data: RefreshTokenRequest,
    ) -> TokenResponse:

        token_hash = hash_refresh_token(
            data.refresh_token
        )

        refresh_token = (
            self.refresh_token_repository.get_by_token_hash(
                token_hash
            )
        )

        if not refresh_token:
            logger.warning(
                "Refresh failed: refresh token was not found."
            )

            raise InvalidRefreshTokenException()

        if refresh_token.revoked_at is not None:
            logger.warning(
                "Refresh failed: refresh token %s has been revoked.",
                refresh_token.id,
            )

            raise InvalidRefreshTokenException()

        if refresh_token.expires_at <= datetime.now(timezone.utc):
            logger.warning(
                "Refresh failed: refresh token %s has expired.",
                refresh_token.id,
            )

            raise InvalidRefreshTokenException()


        user = self.user_repository.get_by_id(
            refresh_token.user_id
        )

        if not user:
            logger.warning(
                "Refresh failed: user %s no longer exists.",
                refresh_token.user_id,
            )

            raise InvalidRefreshTokenException()

        new_access_token = create_access_token(
            subject=str(user.id)
        )

        new_refresh_token = generate_refresh_token()

        now = datetime.now(timezone.utc)

        refresh_token.revoked_at = now
        refresh_token.last_used_at = now

        new_refresh_token_record = RefreshToken(
            user_id=user.id,
            token_hash=hash_refresh_token(
                new_refresh_token
            ),
            expires_at=(
                datetime.now(timezone.utc)
                + timedelta(
                    days=settings.refresh_token_expire_days
                )
            ),
        )

        try:
            self.refresh_token_repository.create(
                new_refresh_token_record
            )

            self.db.commit()

        except Exception:
            self.db.rollback()

            logger.exception(
                "Unexpected error while refreshing token "
                "for user '%s'.",
                user.id,
            )

            raise DatabaseSavingErrorException()

        logger.info(
            "Token refreshed successfully for user %s.",
            user.id,
        )

        return TokenResponse(
            access_token=new_access_token,
            refresh_token=new_refresh_token,
        )