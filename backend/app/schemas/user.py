from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from ..models.user import Role


class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: str
    role: Optional[Role] = Role.USER


class UserRead(BaseModel):
    id: int
    email: str
    name: str
    role: Role
    is_active: bool
    created_at: datetime
    updated_at: datetime


class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    name: Optional[str] = None
    role: Optional[Role] = None
    is_active: Optional[bool] = None
