from sqlalchemy import select
from sqlalchemy.orm import Session

from datetime import datetime, timezone

from app.modules.auth.models import RefreshToken


class RefreshTokenRepository:

    def __init__(self, db: Session):
        self.db = db

    def create(self, refresh_token: RefreshToken) -> RefreshToken:
        self.db.add(refresh_token)
        self.db.flush()
        self.db.refresh(refresh_token)

        return refresh_token

    def get_by_token_hash(
        self,
        token_hash: str,
    ) -> RefreshToken | None:

        statement = select(RefreshToken).where(
            RefreshToken.token_hash == token_hash
        )

        return self.db.scalar(statement)

    def revoke(
        self,
        refresh_token: RefreshToken,
    ) -> None:

        refresh_token.revoked_at = datetime.now(timezone.utc)