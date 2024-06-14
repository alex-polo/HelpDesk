from typing import List

from pydantic import BaseModel


class TgUserRequest(BaseModel):
    tg_id: int


class TgAppealParamsResponse(BaseModel):
    company: str
    building: List[str]
    system: List[str]
    incident: List[str]
    priority: List[str]


class TgUserRoleResponse(BaseModel):
    role: str


class TgUserRequest(BaseModel):
    tg_id: int

# class TgUserIsExistModel(BaseModel):
#     is_exist: bool
