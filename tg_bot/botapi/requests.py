from aiogram.client.session import aiohttp

from botapi.params import APIParams
from config import get_endpoints_config, get_api_credentials

ENDPOINTS = get_endpoints_config()
AC = get_api_credentials()


async def bot_login():
    print(f'ENDPOINTS {ENDPOINTS}')
    async with aiohttp.ClientSession() as session:
        headers = {'content-type': 'application/x-www-form-urlencoded', 'accept': 'application/json'}
        async with session.post(url=ENDPOINTS.login,
                                data=f'username={AC.login}&password={AC.password}',
                                headers=headers) as resp:
            print(resp.status)
            print(await resp.json())
