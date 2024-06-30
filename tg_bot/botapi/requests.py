import datetime
import json
import os.path

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


@need_login
async def post_tg_create_appeal(time: datetime,
                                object: str,
                                subject: str,
                                system: str,
                                flour: str,
                                room: str,
                                incident: str,
                                priority: str,
                                comment: str) -> str:
    async with aiohttp.ClientSession() as session:
        headers = {'content-type': 'application/json',
                   'accept': 'application/json',
                   "authorization": f"Bearer {params.TOKEN}"}
        async with session.post(url=params.ENDPOINTS.tg_create_appeal,
                                data=json.dumps({"timedelta": time,
                                                 "object": object,
                                                 "subject": subject,
                                                 "system": system,
                                                 "flour": flour,
                                                 "room": room,
                                                 "incident": incident,
                                                 "priority": priority,
                                                 "comment": comment}),
                                headers=headers) as resp:
            if resp.status == 401:
                raise HTTPUnauthorized()
            appeal: str = (await resp.json())
            if appeal is not None:
                return appeal
            else:
                raise Exception('User Appeal is None in response server')


@need_login
async def post_tg_update_appeal_chanel_post_id(task_id: str, channel_post_id: int) -> str:
    async with aiohttp.ClientSession() as session:
        headers = {'content-type': 'application/json',
                   'accept': 'application/json',
                   "authorization": f"Bearer {params.TOKEN}"}
        async with session.post(url=params.ENDPOINTS.tg_update_appeal_chanel_post_id,
                                data=json.dumps({"task_id": task_id, "chanel_post_id": channel_post_id}),
                                headers=headers) as resp:
            if resp.status == 401:
                raise HTTPUnauthorized()
            if resp.status == 401:
                pass
            else:
                raise Exception('User Appeal is None in response server')


@need_login
async def get_contacts(tg_id: int) -> str:
    async with aiohttp.ClientSession() as session:
        headers = {'content-type': 'application/json',
                   'accept': 'application/json',
                   "authorization": f"Bearer {params.TOKEN}"}
        async with session.get(url=params.ENDPOINTS.contacts,
                               data=json.dumps({'tg_id': tg_id}),
                               headers=headers) as resp:
            if resp.status == 401:
                raise HTTPUnauthorized()
            contacts: str = (await resp.json())
            if contacts is not None:
                return contacts
            else:
                raise Exception('User Appeal is None in response server')


@need_login
async def get_appeals(tg_id: int, status: str) -> str:
    async with aiohttp.ClientSession() as session:
        headers = {'content-type': 'application/json',
                   'accept': 'application/json',
                   "authorization": f"Bearer {params.TOKEN}"}
        async with session.post(url=params.ENDPOINTS.tg_get_appeals,
                                data=json.dumps({'tg_id': tg_id, "status": status}),
                                headers=headers) as resp:
            if resp.status == 401:
                raise HTTPUnauthorized()
            contacts: str = (await resp.json())
            if contacts is not None:
                return contacts
            else:
                raise Exception('User Appeal is None in response server')


@need_login
async def close_appeal(tg_id: int, task_id: str):
    async with aiohttp.ClientSession() as session:
        headers = {'content-type': 'application/json',
                   'accept': 'application/json',
                   "authorization": f"Bearer {params.TOKEN}"}
        async with session.post(url=params.ENDPOINTS.tg_close_appeal,
                                data=json.dumps({'tg_id': tg_id, "task_id": task_id}),
                                headers=headers) as resp:
            if resp.status == 401:
                raise HTTPUnauthorized()
            if resp.status == 202:
                pass
            else:
                raise Exception('User Appeal is None in response server')


@need_login
async def add_photo(file):
    async with (aiohttp.ClientSession() as session):
        headers = {"Authorization": f"Bearer {params.TOKEN}"}
        data = aiohttp.FormData()
        data.add_field('file',
                       open(file, 'rb'),
                       filename=file,
                       content_type='multipart/form-data')
        async with session.post(url=params.ENDPOINTS.tg_appeal_add_photo,
                                data=data,
                                headers=headers) as resp:
            if resp.status == 401:
                raise HTTPUnauthorized()
            if resp.status == 201:
                pass
            else:
                raise Exception('User Appeal is None in response server')
