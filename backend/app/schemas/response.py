from pydantic import BaseModel
from typing import Any, Optional, List


class Meta(BaseModel):
    page: Optional[int] = None
    total: Optional[int] = None


class ResponseModel(BaseModel):
    success: bool = True
    data: Any = None
    message: str = "Operation successful"
    meta: Optional[Meta] = None


class ErrorDetail(BaseModel):
    field: str
    message: str


class ErrorResponse(BaseModel):
    success: bool = False
    error: dict = {
        "code": "UNKNOWN_ERROR",
        "message": "An error occurred",
        "details": []
    }
