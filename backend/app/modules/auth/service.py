from sqlalchemy.orm import Session

from app.core.logger import logger

from app.modules.users.models import User
from app.modules.users.schemas import UserCreate, UserResponse
from app.modules.users.repository import UserRepository

from app.core.api.exceptions import (
    UsernameAlreadyExistsException,
    EmailAlreadyExistsException,
    InvalidCredentialsException,
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
from app.modules.auth.schemas import LoginRequest, TokenResponse

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