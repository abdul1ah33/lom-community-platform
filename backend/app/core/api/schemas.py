from typing import Any

from pydantic import BaseModel


class ErrorDetail(BaseModel):
    code: str
    message: str
    details: list[dict[str, Any]] | None = None


class SuccessSchema(BaseModel):
    success: bool = True
    message: str
    data: Any = None


class ErrorSchema(BaseModel):
    success: bool = False
    error: ErrorDetail