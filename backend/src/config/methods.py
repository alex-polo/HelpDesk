import os

from environs import Env
from .classes import DatabaseConfig, AdminUserConfig


def get_admin_user_config() -> AdminUserConfig:
    env = Env()
    env.read_env(os.path.join(os.getcwd(), '.env'))
    return AdminUserConfig(
        username=env.str('ADMIN_LOGIN'),
        password=env.str('ADMIN_PASSWORD'),
        resetting_admin_user=True if env.str('RESETTING_ADMIN') == 'YES' else False
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
