from aiogram.client.session import aiohttp

from botapi.params import APIParams

# from .params import ENDPOINTS


api_params = APIParams()
async def bot_login():
    print(f'ENDPOINTS {api_params.get_endpoints()}')
    async with aiohttp.ClientSession() as session:
        headers = {'content-type': 'application/x-www-form-urlencoded', 'accept': 'application/json'}
        async with session.post(url=api_params.get_endpoints().login,
                                # data=f'username={bot_user_login}&password={bot_user_password}',
                                # data=f'username={bot_user_login}&password={bot_user_password}',
                                headers=headers) as resp:
            print(resp.status)
            print(await resp.json())
