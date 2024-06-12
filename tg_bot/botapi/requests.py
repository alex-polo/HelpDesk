import json

from aiogram.client.session import aiohttp

from botapi.params import APIParams
from config import get_endpoints_config, get_api_credentials

ENDPOINTS = get_endpoints_config()
AC = get_api_credentials()


async def bot_login() -> str:
    async with aiohttp.ClientSession() as session:
        headers = {'content-type': 'application/x-www-form-urlencoded', 'accept': 'application/json'}
        async with session.post(url=ENDPOINTS.login,
                                data=f'username={AC.login}&password={AC.password}',
                                headers=headers) as resp:
            token: str = (await resp.json()).get('access_token')
            if token is not None:
                return token
            else:
                raise Exception('Token is None in response server')


async def get_token():
    try:
        atoken = await bot_login()
        print(atoken)
    except Exception as error:
        print(error)


TOKEN = get_token()

@login
async def get_user_roles():
    pass
