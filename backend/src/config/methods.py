import os

from environs import Env
from .classes import DatabaseConfig, SystemUserConfig, AuthConfig


def get_admin_user_config() -> SystemUserConfig:
    env = Env()
    env.read_env(os.path.join(os.getcwd(), '.env'))
    return SystemUserConfig(
        username=env.str('ADMIN_USER_LOGIN'),
        password=env.str('ADMIN_USER_PASSWORD'),
        resetting_user=True if env.str('RESETTING_ADMIN_USER') == 'YES' else False
    )


def get_bot_user_config() -> SystemUserConfig:
    env = Env()
    env.read_env(os.path.join(os.getcwd(), '.env'))
    return SystemUserConfig(
        username=env.str('BOT_USER_LOGIN'),
        password=env.str('BOT_USER_PASSWORD'),
        resetting_user=True if env.str('RESETTING_BOT_USER') == 'YES' else False
    )


def get_database_config() -> DatabaseConfig:
    env = Env()
    env.read_env(os.path.join(os.getcwd(), '.env'))

    return DatabaseConfig(
        DB_USER=env.str('DB_USER'),
        DB_PASS=env.str('DB_PASS'),
        DB_HOST=env.str('DB_HOST'),
        DB_PORT=env.str('DB_PORT'),
        DB_NAME=env.str('DB_NAME'),
    )


def get_auth_config() -> AuthConfig:
    env = Env()
    env.read_env(os.path.join(os.getcwd(), '.env'))

    return AuthConfig(
        auth_secret_key=env.str('AUTH_SECRET_KEY')
    )
