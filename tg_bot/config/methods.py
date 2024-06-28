import os

from dotenv import load_dotenv

from .classes import ApiCredentials, BotConfig, Endpoints, BotChannel
from .endpoints import (login_url, logout_url, tg_user_role_url,
                        tg_user_appeal_params_url, tg_create_appeal_url, contacts_url, tg_get_appeals_url,
                        tg_update_appeal_chanel_post_id_url, tg_close_appeal_url)


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
        tg_create_appeal=f'{base_url}/{tg_create_appeal_url}',
        tg_update_appeal_chanel_post_id=f'{base_url}/{tg_update_appeal_chanel_post_id_url}',
        contacts=f'{base_url}/{contacts_url}',
        tg_get_appeals=f'{base_url}/{tg_get_appeals_url}',
        tg_close_appeal=f'{base_url}/{tg_close_appeal_url}'
    )


def get_channel_id_config() -> BotChannel:
    load_dotenv()
    return BotChannel(
        channel_id=os.getenv('CHANNEL_ID')
    )
