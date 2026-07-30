from sqlalchemy.orm import Session

from app.core.security import hash_password
from app.modules.users.models import User
from app.modules.users.repository import UserRepository
from app.modules.users.schemas import UserCreate


class AuthService:
    def __init__(self, db: Session, user_repo):
        self.db = db
        self.user_repository = user_repo

    def register(self, data: UserCreate) -> User:

        if self.user_repository.get_by_username(data.username):
            raise ValueError("Username already exists.")

        if self.user_repository.get_by_email(data.email):
            raise ValueError("Email already exists.")

        user = User(
            username=data.username,
            email=data.email,
            password_hash=hash_password(data.password),
        )

        self.user_repository.create(user)

        self.db.commit()

        return user