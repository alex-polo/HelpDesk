from pydantic import BaseModel


class TGUserResponseModel(BaseModel):
    tg_id: int
    first_name: str
    second_name: str
    surname: str
    phone_number_tg: str
    phone_number_human: str
    is_active: str


class QueryValue(BaseModel):
    data: str
