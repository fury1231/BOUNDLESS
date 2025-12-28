from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session

from ..database import get_session
from ..schemas import ResponseModel, UserCreate, UserRead, UserUpdate
from ..services.user_service import UserService

router = APIRouter(prefix="/api/v1/users", tags=["users"])


@router.get("", response_model=ResponseModel)
async def get_users(
    skip: int = 0,
    limit: int = 100,
    session: Session = Depends(get_session)
):
    service = UserService(session)
    users = service.get_users(skip=skip, limit=limit)
    return ResponseModel(
        data=[UserRead.model_validate(u) for u in users],
        message="Users retrieved successfully"
    )


@router.get("/{user_id}", response_model=ResponseModel)
async def get_user(user_id: int, session: Session = Depends(get_session)):
    service = UserService(session)
    user = service.get_user(user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"code": "USER_NOT_FOUND", "message": "User not found"}
        )
    return ResponseModel(
        data=UserRead.model_validate(user),
        message="User retrieved successfully"
    )


@router.post("", response_model=ResponseModel, status_code=status.HTTP_201_CREATED)
async def create_user(user_data: UserCreate, session: Session = Depends(get_session)):
    service = UserService(session)
    user = service.create_user(user_data)
    return ResponseModel(
        data=UserRead.model_validate(user),
        message="User created successfully"
    )


@router.patch("/{user_id}", response_model=ResponseModel)
async def update_user(
    user_id: int,
    user_data: UserUpdate,
    session: Session = Depends(get_session)
):
    service = UserService(session)
    user = service.update_user(user_id, user_data)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"code": "USER_NOT_FOUND", "message": "User not found"}
        )
    return ResponseModel(
        data=UserRead.model_validate(user),
        message="User updated successfully"
    )


@router.delete("/{user_id}", response_model=ResponseModel)
async def delete_user(user_id: int, session: Session = Depends(get_session)):
    service = UserService(session)
    success = service.delete_user(user_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"code": "USER_NOT_FOUND", "message": "User not found"}
        )
    return ResponseModel(message="User deleted successfully")
