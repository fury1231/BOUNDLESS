from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from .config import settings
from .database import init_db, engine
from .routers import users_router
from .routers.auth import router as auth_router
from .admin import setup_admin


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(
    title="無垠科技 API",
    description="Beyond Boundaries. Architecting the Infinite.",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users_router)
app.include_router(auth_router)

setup_admin(app, engine)


@app.get("/")
async def root():
    return {
        "name": "無垠科技 API",
        "tagline": "智識無界，創新無垠",
        "docs": "/docs",
        "admin": "/admin"
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy"}
