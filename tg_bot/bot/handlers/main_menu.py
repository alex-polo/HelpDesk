from aiogram import Router
from aiogram.filters import CommandStart
from aiogram.types import Message

from bot.filters.verify_f import VerifyUser, user_id
from botapi.requests import bot_login

router = Router()


@router.message(CommandStart(), VerifyUser(user_id))
async def cmd_start(message: Message):
    await bot_login()
    await message.answer("ok")
