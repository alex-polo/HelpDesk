from aiogram import Router, F
from aiogram.filters import StateFilter
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import StatesGroup, State
from aiogram.types import Message

from bot.keyboards import get_feedback_kb, get_main_menu_kb
from botapi import get_tg_user_role

router = Router()


class Feedback(StatesGroup):
    text = State()


@router.message(F.text == "/feedback")
async def get_feedback(message: Message, state: FSMContext):
    await state.set_state(Feedback.text)
    await message.answer(text="Оставьте обратную связь", reply_markup=get_feedback_kb())


@router.message(F.text, StateFilter(Feedback.text))
async def send_feedback(message: Message, state: FSMContext):
    data = await get_tg_user_role(message.from_user.id)
    if data is not None:
        users_list = [1344084119, 186208978, 223663162]
        for user in users_list:
            await message.bot.send_message(chat_id=user,
                                           text=f"Обратная связь от пользователя: "
                                                f"{message.from_user.id}\n\n{message.text}")
        await message.answer(text="Обратная связь отправлена. Спасибо за участие", reply_markup=get_main_menu_kb())
        await state.clear()
    else:
        await message.answer(text=f"Пожалуйста, сообщите ваш id администратору. Ваш id:{message.from_user.id}")
