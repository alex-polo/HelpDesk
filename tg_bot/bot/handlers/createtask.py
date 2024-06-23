from aiogram import Router, F
from aiogram.filters import StateFilter
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import StatesGroup, State
from aiogram.types import Message, ReplyKeyboardMarkup
from aiogram.utils.keyboard import ReplyKeyboardBuilder

from bot.filters.verify_f import VerifyUser, user_id

router = Router()


class NewTask(StatesGroup):
    building = State()
    system = State()
    incident = State()
    priority = State()
    photo = State()


@router.message(F.text == "Создать заявку", StateFilter(None), VerifyUser(user_id))
async def new_task(message: Message, state: FSMContext):
    await message.answer(text=f"Выберите объект")
    await state.set_state(NewTask.building)


@router.message(StateFilter(NewTask.building), VerifyUser(user_id))
async def new_task(message: Message, state: FSMContext):
    await state.update_data(building=message.text)
    await message.answer(text=f"Выберите систему")
    await state.set_state(NewTask.system)


def get_photo_kb() -> ReplyKeyboardMarkup:
    kb = ReplyKeyboardBuilder()
    kb.button(text="Прикрепить фотографию")
    kb.button(text="Продолжить без фотографии")
    kb.adjust(2)
    return kb.as_markup(resize_keyboard=True)


@router.message(F.text == "Продолжить без фотографии", StateFilter(NewTask.system), VerifyUser(user_id))
async def post_task(message: Message, state: FSMContext):
    user_data = await state.get_data()
    channel_post_id = await message.bot.send_message(chat_id=-1002152010360, text=f"Объект:{user_data['building']}, "
                                                                                  f"Система:{user_data['system']}")
    await message.answer(text=f"Задача: {channel_post_id.message_id} создана.")
    users_list = [5175421239, 1344084119]
    # users_list = [5175421239, 1344084119, 186208978, 223663162]
    for user in users_list:
        await message.bot.forward_message(chat_id=user,
                                          from_chat_id=-1002152010360,
                                          message_id=channel_post_id.message_id)
    await state.clear()

@router.message(F.text == "Прикрепить фотографию", StateFilter(NewTask.system), VerifyUser(user_id))
async def photo_wait(message: Message, state: FSMContext):
    await message.answer(text="Загрузите фотографию")
    await state.set_state(NewTask.photo)


@router.message(StateFilter(NewTask.photo), VerifyUser(user_id))
async def post_task(message: Message, state: FSMContext):
    photo = message.photo[-1].file_id
    user_data = await state.get_data()
    channel_post_id = await message.bot.send_photo(chat_id=-1002152010360,
                                                   caption=f"Объект:{user_data['building']}, "
                                                           f"Система:{user_data['system']}",
                                                   photo=photo)
    await message.answer(text=f"Задача: {channel_post_id.message_id} создана.")
    # users_list = [5175421239, 1344084119, 186208978, 223663162]
    users_list = [5175421239, 1344084119]
    for user in users_list:
        await message.bot.forward_message(chat_id=user,
                                          from_chat_id=-1002152010360,
                                          message_id=channel_post_id.message_id)
    await state.clear()


@router.message(StateFilter(NewTask.system), VerifyUser(user_id))
async def new_task(message: Message, state: FSMContext):
    await state.update_data(system=message.text)
    await message.answer(text=f"Прикрепить фотографию?", reply_markup=get_photo_kb())