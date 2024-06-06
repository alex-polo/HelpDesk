import os

from aiogram import Bot, Dispatcher
from dotenv import load_dotenv
from aiogram.fsm.storage.memory import MemoryStorage

load_dotenv()
bot = Bot(os.getenv('TOKEN'))
storage = MemoryStorage()
dp = Dispatcher()

dp.include_routers(main_menu.router)


async def main() -> None:
    # await async_main() #движок БД
    await dp.start_polling(bot)