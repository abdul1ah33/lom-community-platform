from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError

from app.core.exceptions import AppException
from app.core.responses import ErrorResponse


def register_exception_handlers(app: FastAPI):

    @app.exception_handler(AppException)
    async def app_exception_handler(
        request: Request,
        exc: AppException,
    ):
        return ErrorResponse(
            status_code=exc.status_code,
            error_code=exc.error_code,
            message=exc.message,
        )