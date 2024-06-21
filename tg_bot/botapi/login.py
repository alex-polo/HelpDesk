import aiohttp
from aiohttp.web_exceptions import HTTPUnauthorized

from botapi import params


async def bot_login() -> str:
    async with aiohttp.ClientSession() as session:
        headers = {'content-type': 'application/x-www-form-urlencoded', 'accept': 'application/json'}
        async with session.post(url=params.ENDPOINTS.login,
                                data=f'username={params.AC.login}&password={params.AC.password}',
                                headers=headers) as resp:
            token: str = (await resp.json()).get('access_token')
            if token is not None:
                return token
            else:
                raise Exception('Token is None in response server')


def need_login(request):
    async def wrapper(*args, **kwargs):
        try:
            return await request(*args, **kwargs)
        except HTTPUnauthorized:
            params.TOKEN = await bot_login()
            return await request(*args, **kwargs)
    return wrapper
