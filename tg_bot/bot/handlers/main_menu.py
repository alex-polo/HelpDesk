from aiogram import Router
from aiogram.filters import CommandStart
from aiogram.types import Message

from bot.filters.verify_f import VerifyUser, user_id
from botapi.requests import bot_login, get_tg_user_role, get_tg_user_appeal_params

router = Router()


@router.message(CommandStart(), VerifyUser(user_id))
async def cmd_start(message: Message):
    data = await bot_login()
    # api1 = await get_tg_user_role(message.from_user.id)
    # api2 = await get_tg_user_appeal_params(message.from_user.id)
    await message.answer(data)
    # await message.answer(api1)
    # await message.answer(api2)
