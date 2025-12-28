"""標準回應格式工具"""

from typing import Any, Optional
from pydantic import BaseModel


class ApiResponse(BaseModel):
    """標準 API 回應格式"""
    success: bool
    data: Optional[Any] = None
    message: str = ""
    meta: Optional[dict] = None


class ErrorDetail(BaseModel):
    """錯誤詳情"""
    field: str
    message: str


class ApiError(BaseModel):
    """標準錯誤格式"""
    success: bool = False
    error: dict


def success_response(
    data: Any = None,
    message: str = "Operation successful",
    meta: Optional[dict] = None
) -> dict:
    """建立成功回應"""
    return {
        "success": True,
        "data": data,
        "message": message,
        "meta": meta
    }


def error_response(
    code: str,
    message: str,
    details: Optional[list] = None
) -> dict:
    """建立錯誤回應"""
    return {
        "success": False,
        "error": {
            "code": code,
            "message": message,
            "details": details or []
        }
    }
