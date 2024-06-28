from dataclasses import dataclass


@dataclass
class Endpoints:
    base_url: str
    login: str
    logout: str
    tg_user_role: str
    tg_user_appeal_params: str
    tg_create_appeal: str
    tg_update_appeal_chanel_post_id: str
    contacts: str
    tg_get_appeals: str
    tg_close_appeal: str
    tg_appeal_add_photo: str


@dataclass
class ApiCredentials:
    login: str
    password: str


@dataclass
class BotConfig:
    token: str


@dataclass
class BotChannel:
    channel_id: str
