from fastapi import FastAPI

from app.modules.auth.router import router as auth_router

from app.core.api.handlers import register_exception_handlers



app = FastAPI(
    title="Lord of Mysteries Community API",
    version="1.0.0",
)

register_exception_handlers(app)

app.include_router(auth_router, prefix="/api/v1/auth", tags=["Authentication"])


@app.get("/")
def root():
    return {
        "message": "Welcome to the Lord of Mysteries Community Platform API!"
    }