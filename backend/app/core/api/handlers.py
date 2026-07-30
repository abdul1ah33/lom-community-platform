from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError

from app.core.api.exceptions import AppException
from app.core.api.responses import ErrorResponse


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


    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(
        request: Request,
        exc: RequestValidationError,
    ):
        errors = []

        for error in exc.errors():
            errors.append(
                {
                    "field": ".".join(map(str, error["loc"][1:])),
                    "message": error["msg"],
                }
            )

        return ErrorResponse(
            status_code=422,
            error_code="VALIDATION_ERROR",
            message="Request validation failed.",
            details=errors,
        )