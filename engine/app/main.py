from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.routers import generate, adaptive, curriculum
import os

app = FastAPI(
    title=settings.app_name,
    version="0.1.0",
    description="Khel AI Engine — game generation, adaptive difficulty, curriculum mapping",
)

# Get allowed origins from environment
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://localhost:3001").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(generate.router)
app.include_router(adaptive.router)
app.include_router(curriculum.router)


@app.get("/health")
async def health() -> dict:
    return {"status": "ok", "service": "khel-engine"}
