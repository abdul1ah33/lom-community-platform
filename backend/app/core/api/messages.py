class SuccessMessages:
    USER_REGISTERED = "User registered successfully."
    LOGIN_SUCCESSFUL = "Login successful."
    LOGOUT_SUCCESSFUL = "Logged out successfully."
    PASSWORD_CHANGED = "Password changed successfully."


class ErrorMessages:
    USERNAME_ALREADY_EXISTS = "A user with this username already exists."
    EMAIL_ALREADY_EXISTS = "A user with this email already exists."
    INVALID_CREDENTIALS = "Invalid email or password."
    USER_NOT_FOUND = "The requested user does not exist."
    INVALID_TOKEN = "The authentication token is invalid or has expired."
    FORBIDDEN = "You do not have permission to perform this action."