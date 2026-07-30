from fastapi import Depends
from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.modules.auth.service import AuthService
from app.modules.users.repository import UserRepository


def get_user_repository(
    db: Session = Depends(get_db),
) -> UserRepository:
    return UserRepository(db)


def get_auth_service(
    db: Session = Depends(get_db),
    user_repository: UserRepository = Depends(get_user_repository),
) -> AuthService:
    return AuthService(db, user_repository)