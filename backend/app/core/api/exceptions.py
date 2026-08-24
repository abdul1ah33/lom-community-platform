from fastapi import status


class AppException(Exception):
    """
    Base application exception.
    Every custom exception inherits from this class.
    """

    status_code: int = status.HTTP_500_INTERNAL_SERVER_ERROR
    error_code: str = "INTERNAL_SERVER_ERROR"
    message: str = "An unexpected error occurred."

    def __init__(self, message: str | None = None):
        if message:
            self.message = message

        super().__init__(self.message)


# Custom exceptions for the authentication module
# regisgter
class UsernameAlreadyExistsException(AppException):
    status_code = status.HTTP_409_CONFLICT
    error_code = "USERNAME_ALREADY_EXISTS"
    message = "A user with this username already exists."


class EmailAlreadyExistsException(AppException):
    status_code = status.HTTP_409_CONFLICT
    error_code = "EMAIL_ALREADY_EXISTS"
    message = "A user with this email already exists."


# login
class InvalidCredentialsException(AppException):
    status_code = status.HTTP_401_UNAUTHORIZED
    error_code = "INVALID_CREDENTIALS"
    message = "Invalid email or password."


class UserNotFoundException(AppException):
    status_code = status.HTTP_404_NOT_FOUND
    error_code = "USER_NOT_FOUND"
    message = "The requested user does not exist."


class UnauthorizedException(AppException):
    status_code = status.HTTP_401_UNAUTHORIZED
    error_code = "UNAUTHORIZED"
    message = "You are not authorized to access this resource."


class ForbiddenException(AppException):
    status_code = status.HTTP_403_FORBIDDEN
    error_code = "FORBIDDEN"
    message = "You do not have permission to perform this action."


class InvalidAccessTokenException(AppException):
    status_code = 401
    error_code = "INVALID_TOKEN"
    message = "Invalid or expired access token."