from dataclasses import dataclass


@dataclass
class Endpoints:
    base_url: str
    login: str
    logout: str
    user_is_exist: str

@dataclass
class ApiCredentials:
    login: str
    password: str

@dataclass
class BotConfig:
    token: str