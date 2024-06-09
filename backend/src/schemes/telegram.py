from pydantic import BaseModel


class TgUserIsExistModel(BaseModel):
    is_exist: bool
