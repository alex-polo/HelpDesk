import os
import ssl

import aiohttp
import asyncio

from aiohttp import TCPConnector
from dotenv import load_dotenv

load_dotenv()
bot_user_login = os.getenv('BOT_USER_LOGIN')
bot_user_password = os.getenv('BOT_USER_PASSWORD')

# ssl_context = ssl.create_default_context()
# ssl_context.load_cert_chain("../cert/developer.host.crt",
#                             "../cert/device.key")


async def bot_login():
    async with aiohttp.ClientSession() as session:
        # async with aiohttp.ClientSession(connector=TCPConnector(ssl_context=ssl_context)) as session:
        async with session.post('https://localhost:8443/auth/auth/jwt/login',
                                data=f"username={bot_user_login}&password={bot_user_password}") as response:

            print("Status:", response.status)
            print("Content-type:", response.headers['content-type'])

            html = await response.text()
            print("Body:", html[:15], "...")

asyncio.run(bot_login())


async def bot_login(bot_user_login: str, bot_user_password: str):
    pass


async def get_users_list():
    pass
