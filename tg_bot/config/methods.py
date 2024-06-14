import os

from dotenv import load_dotenv

from .classes import ApiCredentials, BotConfig, Endpoints
from .endpoints import login_url, logout_url, tg_user_role_url, tg_user_appeal_params_url


def get_api_credentials() -> ApiCredentials:
    load_dotenv()
    return ApiCredentials(
        login=os.getenv('BOT_USER_LOGIN'),
        password=os.getenv('BOT_USER_PASSWORD')
    )


def get_bot_config() -> BotConfig:
    load_dotenv()
    return BotConfig(
        token=os.getenv('TOKEN')
    )


def get_endpoints_config() -> Endpoints:
    load_dotenv()
    base_url: str = os.getenv('BASE_API_ENDPOINT')
    return Endpoints(
        base_url=base_url,
        login=f'{base_url}/{login_url}',
        logout=f'{base_url}/{logout_url}',
        tg_user_role=f'{base_url}/{tg_user_role_url}',
        tg_user_appeal_params=f'{base_url}/{tg_user_appeal_params_url}',
    )

