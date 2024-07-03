from pydantic import BaseModel


class TGUserResponseModel(BaseModel):
    tg_id: int
    first_name: str
    second_name: str
    surname: str
    phone_number_tg: str
    phone_number_human: str
    is_active: str


class CreateOrganizationQuery(BaseModel):
    name: str
    address: str
    inn: int
    supervisor: str
    description: str
    is_active: bool


class OrganizationResponse(CreateOrganizationQuery):
    id: int


class CreateObjectQuery(BaseModel):
    name: str
    address: str
    description: str
    is_active: bool


class ObjectResponse(BaseModel):
    id: int
    name: str
    address: str
    description: str
