import json

from aiogram.client.session import aiohttp
from aiohttp.web_exceptions import HTTPUnauthorized

from botapi import params
from botapi.login import need_login


@need_login
async def get_tg_user_role(tg_id: int) -> str:
    async with aiohttp.ClientSession() as session:
        headers = {'content-type': 'application/json',
                   'accept': 'application/json',
                   'Authorization': f'Bearer {params.TOKEN}'}
        async with session.post(url=params.ENDPOINTS.tg_user_role,
                                data=json.dumps({'tg_id': tg_id}),
                                headers=headers) as resp:
            if resp.status == 401:
                raise HTTPUnauthorized()

            user_role: str = (await resp.json()).get('role')
            if user_role is not None:
                return user_role
            else:
                raise Exception('User role is None in response server')


@need_login
async def get_tg_user_appeal_params(tg_id: int = 0) -> str:
    async with aiohttp.ClientSession() as session:
        headers = {'content-type': 'application/json',
                   'accept': 'application/json',
                   "authorization": f"Bearer {params.TOKEN}"}
        async with session.post(url=params.ENDPOINTS.tg_user_appeal_params,
                                data=json.dumps({'tg_id': tg_id}),
                                headers=headers) as resp:
            if resp.status == 401:
                raise HTTPUnauthorized()
            user_appeal: str = (await resp.json())
            if user_appeal is not None:
                return user_appeal
            else:
                raise Exception('User Appeal is None in response server')
