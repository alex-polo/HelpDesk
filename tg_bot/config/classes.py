from dataclasses import dataclass


@dataclass
class Endpoints:
    base_url: str
    login: str
    logout: str
    tg_user_role: str
    tg_user_appeal_params: str


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
