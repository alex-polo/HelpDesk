from pydantic import BaseModel


class TGUserResponseModel(BaseModel):
    tg_id: int
    first_name: str
    second_name: str
    surname: str
    phone_number_tg: str
    phone_number_human: str
    is_active: str


class CreateObjectQuery(BaseModel):
    name: str
    description: str


class ObjectResponse(BaseModel):
    id: int
    name: str
