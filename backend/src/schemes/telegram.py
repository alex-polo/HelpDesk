from datetime import datetime
from typing import List

from fastapi import UploadFile
from pydantic import BaseModel


class TgUserRequest(BaseModel):
    tg_id: int


class TgAppealRequest(BaseModel):
    timedelta: datetime
    object: str
    subject: str
    system: str
    flour: str
    room: str
    incident: str
    priority: str
    comment: str


class TgAppealChannelTaskIDRequest(BaseModel):
    task_id: str
    chanel_post_id: int


class TgCloseAppealRequest(BaseModel):
    tg_id: int
    task_id: str


class TgAppealsRequest(BaseModel):
    tg_id: int
    status: str


class TgAppealCreateTaskIDResponse(BaseModel):
    task_id: str
    user_list: List[int]


class TgAppealParamsResponse(BaseModel):
    object: List[str]
    subject: List[str]
    system: List[str]
    incident: List[str]
    priority: List[str]


class TgContactsResponse(BaseModel):
    name: str
    phone: str
    role: str


class TgUserRoleResponse(BaseModel):
    role: str


class TgAppealsResponse(BaseModel):
    task_id: str
    chanel_post_id: int
    priority: str
