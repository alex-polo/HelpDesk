from aiogram import Router
from aiogram.filters import CommandStart
from aiogram.types import Message

from tg_bot.filters.verify_f import VerifyUser, user_id

router = Router()

@router.message(CommandStart(), VerifyUser(user_id))
async def cmd_start(message: Message):
    await message.answer("ok")
