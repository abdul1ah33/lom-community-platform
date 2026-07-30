from fastapi import FastAPI

from app.modules.auth.router import router as auth_router

app = FastAPI(
    title="Lord of Mysteries Community API",
    version="1.0.0",
)

app.include_router(auth_router, prefix="/api/v1/auth", tags=["Authentication"])


@app.get("/")
def root():
    return {
        "message": "Welcome to the Lord of Mysteries Community Platform API!"
    }