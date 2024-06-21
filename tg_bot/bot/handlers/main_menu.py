from aiogram import Router
from aiogram.filters import CommandStart
from aiogram.types import Message

from bot.filters.verify_f import VerifyUser, user_id
from botapi import get_tg_user_role
from bot.keyboards import main_menu_kb

router = Router()


@router.message(CommandStart(), VerifyUser(user_id))
async def cmd_start(message: Message):
    data = await get_tg_user_role(message.from_user.id)
    if data is not None:
        await message.answer(text=f"Добро пожаловать {data}", reply_markup=main_menu_kb.get_main_menu_kb())
    else:
        await message.answer(text=f"Пожалуйста, сообщите ваш id администратору. Ваш id:{message.from_user.id}")
