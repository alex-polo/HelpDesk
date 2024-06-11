import fastapi
from fastapi import APIRouter, Depends, HTTPException

from .manager import auth_backend, fastapi_users, current_active_user
from .schemes import UserRead, UserCreate, UserUpdate
from ..models import User

auth_router = APIRouter(
    tags=["auth"],
)

auth_router.include_router(
    fastapi_users.get_auth_router(auth_backend), prefix="/auth/jwt", tags=["auth"]
)


@auth_router.get("/users/me", status_code=fastapi.status.HTTP_200_OK, response_model=UserRead)
async def user_profile(user: User = Depends(current_active_user)):
    return user


# auth_router.include_router(
#     fastapi_users.get_register_router(UserRead, UserCreate),
#     prefix="/auth",
#     tags=["auth"],
# )

# auth_router.include_router(
#     fastapi_users.get_reset_password_router(),
#     prefix="/auth",
#     tags=["auth"],
# )
# auth_router.include_router(
#     fastapi_users.get_verify_router(UserRead),
#     prefix="/auth",
#     tags=["auth"],
# )
# auth_router.include_router(
#     fastapi_users.get_users_router(UserRead, UserUpdate),
#     prefix="/users",
#     tags=["users"],
# )
