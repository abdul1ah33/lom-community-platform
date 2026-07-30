from sqlalchemy.orm import Session

from app.core.logger import logger

from app.core.auth.security import hash_password
from app.modules.users.models import User
from app.modules.users.schemas import UserCreate, UserResponse
from app.modules.users.repository import UserRepository

from app.core.api.exceptions import (
    UsernameAlreadyExistsException,
    EmailAlreadyExistsException,
)


class AuthService:
    def __init__(self, db: Session, user_repo: UserRepository):
        self.db = db
        self.user_repository = user_repo

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