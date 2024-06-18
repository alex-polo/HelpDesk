from aiogram import Router
from aiogram.filters import StateFilter
from aiogram.fsm.state import StatesGroup, State
from aiogram.types import Message

from bot.filters.verify_f import VerifyUser, user_id

router = Router()


class NewBuy(StatesGroup):
    building = State()
    system = State()
    incident = State()
    priority = State()


@router.message(F.text == "Создать задачу", StateFilter(None), VerifyUser(user_id))
async def cmd_start(message: Message):
    pass