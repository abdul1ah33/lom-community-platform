from typing import Any

from fastapi.responses import JSONResponse


class SuccessResponse(JSONResponse):
    def __init__(
        self,
        *,
        data: Any = None,
        message: str = "Success",
        status_code: int = 200,
    ):
        super().__init__(
            status_code=status_code,
            content={
                "success": True,
                "message": message,
                "data": data,
            },
        )


class ErrorResponse(JSONResponse):
    def __init__(
        self,
        *,
        status_code: int,
        error_code: str,
        message: str,
        details: Any | None = None,
    ):
        content = {
            "success": False,
            "error": {
                "code": error_code,
                "message": message,
            },
        }

        if details is not None:
            content["error"]["details"] = details

        super().__init__(
            status_code=status_code,
            content=content,
        )