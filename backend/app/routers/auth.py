from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlmodel import Session

from ..database import get_session
from ..models.user import User
from ..schemas.auth import LoginRequest, RegisterRequest, TokenResponse, RefreshRequest
from ..schemas import ResponseModel, UserRead
from ..services.user_service import UserService
from ..auth.utils import verify_password, create_access_token, create_refresh_token, verify_token
from ..auth.dependencies import get_current_active_user

router = APIRouter(prefix="/api/v1/auth", tags=["auth"])


@router.post("/register", response_model=ResponseModel, status_code=status.HTTP_201_CREATED)
async def register(data: RegisterRequest, session: Session = Depends(get_session)):
    service = UserService(session)
    
    existing_user = service.get_user_by_email(data.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"code": "EMAIL_EXISTS", "message": "Email already registered"}
        )
    
    from ..schemas import UserCreate
    user = service.create_user(UserCreate(
        email=data.email,
        password=data.password,
        name=data.name
    ))
    
    return ResponseModel(
        data=UserRead.model_validate(user),
        message="User registered successfully"
    )


@router.post("/login", response_model=ResponseModel)
async def login(data: LoginRequest, response: Response, session: Session = Depends(get_session)):
    service = UserService(session)
    user = service.get_user_by_email(data.email)
    
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"code": "INVALID_CREDENTIALS", "message": "Incorrect email or password"}
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail={"code": "INACTIVE_USER", "message": "User account is inactive"}
        )
    
    access_token = create_access_token(data={"sub": str(user.id)})
    refresh_token = create_refresh_token(data={"sub": str(user.id)})
    
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=True,
        samesite="lax",
        max_age=7 * 24 * 60 * 60
    )
    
    return ResponseModel(
        data=TokenResponse(
            access_token=access_token,
            refresh_token=refresh_token
        ),
        message="Login successful"
    )


@router.post("/refresh", response_model=ResponseModel)
async def refresh_token(data: RefreshRequest, session: Session = Depends(get_session)):
    payload = verify_token(data.refresh_token, "refresh")
    
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"code": "INVALID_REFRESH_TOKEN", "message": "Invalid refresh token"}
        )
    
    user_id = payload.get("sub")
    service = UserService(session)
    user = service.get_user(int(user_id))
    
    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"code": "INVALID_USER", "message": "User not found or inactive"}
        )
    
    access_token = create_access_token(data={"sub": str(user.id)})
    refresh_token = create_refresh_token(data={"sub": str(user.id)})
    
    return ResponseModel(
        data=TokenResponse(
            access_token=access_token,
            refresh_token=refresh_token
        ),
        message="Token refreshed successfully"
    )


@router.get("/me", response_model=ResponseModel)
async def get_me(current_user: User = Depends(get_current_active_user)):
    return ResponseModel(
        data=UserRead.model_validate(current_user),
        message="User retrieved successfully"
    )


@router.post("/logout", response_model=ResponseModel)
async def logout(response: Response):
    response.delete_cookie(key="refresh_token")
    return ResponseModel(message="Logout successful")
