from dataclasses import dataclass


@dataclass
class ServerConfig:
    auth_secret_key: str


@dataclass
class SystemUserConfig:
    username: str
    password: str
    resetting_user: bool


@dataclass
class DatabaseConfig:
    DB_USER: str
    DB_PASS: str
    DB_HOST: str
    DB_PORT: str
    DB_NAME: str
