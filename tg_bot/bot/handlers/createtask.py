from dataclasses import dataclass
import json

from aiogram import Router, F, types
from aiogram.filters import StateFilter
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import StatesGroup, State
from aiogram.types import Message, ReplyKeyboardMarkup
from aiogram.utils.keyboard import ReplyKeyboardBuilder

from bot.filters.verify_f import VerifyUser, user_id
from bot.keyboards import get_object_kb, get_photo_kb, get_subject_kb, get_priority_kb, get_incident_kb, get_system_kb, \
    CallbackObjectList, CallbackSubjectList, CallbackSystemList, Props, CallbackPriorityList, CallbackIncidentList

router = Router()


class NewTask(StatesGroup):
    userprops = State()
    object = State()
    subject = State()
    system = State()
    flor = State()
    room = State()
    incident = State()
    priority = State()
    comment = State()
    photo = State()
    getphoto = State()


async def get_new_task_props():
    return Props(object=["СберТауэр"],
                 subject=["А", "Б", "Г", "Е", "Стилобат"],
                 system=["СПС", "СПА", "СОУЭ", "СКУД"],
                 incident=["Сработка", "Неисправность"],
                 priority=["Средний", "Высокий", "Критичный"],
                 task_id=1111,
                 role="Инженер"
    )


@router.message(F.text == "Создать заявку", StateFilter(None), VerifyUser(user_id))
async def new_task(message: Message, state: FSMContext):
    await state.set_state(NewTask.userprops)
    props = await get_new_task_props()
    await state.update_data(userprops=props)
    user_data = await state.get_data()
    await message.answer(text="Выберите объект",
                         reply_markup=await get_object_kb(user_data['userprops']))
    await state.set_state(NewTask.object)


@router.callback_query(CallbackObjectList.filter(), StateFilter(NewTask.object))
async def choose_object(callback: types.CallbackQuery, callback_data: CallbackObjectList, state: FSMContext):
    await state.update_data(object=callback_data.obj)
    user_data = await state.get_data()
    await callback.message.answer(text=f"Выберите субобъект", reply_markup=await get_subject_kb(user_data['userprops']))
    await state.set_state(NewTask.subject)


@router.callback_query(CallbackSubjectList.filter(), StateFilter(NewTask.subject))
async def choose_subject(callback: types.CallbackQuery, callback_data: CallbackSubjectList, state: FSMContext):
    await state.update_data(subject=callback_data.sbj)
    user_data = await state.get_data()
    await callback.message.answer(text=f"Выберите систему", reply_markup=await get_system_kb(user_data['userprops']))
    await state.set_state(NewTask.system)


@router.callback_query(CallbackSystemList.filter(), StateFilter(NewTask.system))
async def choose_system(callback: types.CallbackQuery, callback_data: CallbackSystemList, state: FSMContext):
    await state.update_data(system=callback_data.system)
    await callback.message.answer(text=f"Введите этаж")
    await state.set_state(NewTask.flor)


@router.message(F.text, StateFilter(NewTask.flor))
async def get_flor(message: Message, state: FSMContext):
    await state.update_data(flor=message.text)
    await message.answer(text="Уточните местоположение/укажите помещение")
    await state.set_state(NewTask.room)


@router.message(F.text, StateFilter(NewTask.room))
async def get_flor(message: Message, state: FSMContext):
    await state.update_data(room=message.text)
    user_data = await state.get_data()
    await message.answer(text=f"Выберите тип события",
                         reply_markup=await get_incident_kb(user_data['userprops']))
    await state.set_state(NewTask.incident)


@router.callback_query(CallbackIncidentList.filter(), StateFilter(NewTask.incident))
async def choose_subject(callback: types.CallbackQuery, callback_data: CallbackIncidentList, state: FSMContext):
    await state.update_data(incident=callback_data.incident)
    user_data = await state.get_data()
    await callback.message.answer(text=f"Выберите приоритет",
                                  reply_markup=await get_priority_kb(user_data['userprops']))
    await state.set_state(NewTask.priority)


@router.callback_query(CallbackPriorityList.filter(), StateFilter(NewTask.priority))
async def choose_subject(callback: types.CallbackQuery, callback_data: CallbackSubjectList, state: FSMContext):
    await state.update_data(priority=callback_data.priority)
    await callback.message.answer(text=f"Опишите проблему")
    await state.set_state(NewTask.comment)


@router.message(F.text, StateFilter(NewTask.comment))
async def get_flor(message: Message, state: FSMContext):
    await state.update_data(comment=message.text)
    await message.answer(text=f"Прикрепить фотографию?",
                         reply_markup=get_photo_kb())
    await state.set_state(NewTask.photo)


@router.message(F.text == "Продолжить без фотографии", StateFilter(NewTask.photo), VerifyUser(user_id))
async def post_task(message: Message, state: FSMContext):
    user_data = await state.get_data()
    user_props = user_data['userprops']
    channel_post_id = await message.bot.send_message(chat_id=-1002152010360,
                                                     text=f"Номер заявки: {user_props.task_id}\n"
                                                          f"Объект: {user_data['object']}\n"
                                                          f"Субобъект: {user_data['subject']}\n"
                                                          f"Система: {user_data['system']}\n"
                                                          f"Этаж: {user_data['flor']}\n"
                                                          f"Помещение: {user_data['room']}\n"
                                                          f"Инцидент: {user_data['incident']}\n"
                                                          f"Приоритет: {user_data['priority']}\n"
                                                          f"Комментарий: {user_data['comment']}\n")
    await message.answer(text=f"Задача: {channel_post_id.message_id} создана.")
    # users_list = [5175421239, 1344084119]
    users_list = [1344084119, 186208978, 223663162]
    for user in users_list:
        await message.bot.forward_message(chat_id=user,
                                          from_chat_id=-1002152010360,
                                          message_id=channel_post_id.message_id)
    await state.clear()


@router.message(F.text == "Прикрепить фотографию", StateFilter(NewTask.photo), VerifyUser(user_id))
async def photo_wait(message: Message, state: FSMContext):
    await message.answer(text="Загрузите фотографию")
    await state.set_state(NewTask.getphoto)


@router.message(StateFilter(NewTask.getphoto), VerifyUser(user_id))
async def post_task(message: Message, state: FSMContext):
    photo = message.photo[-1].file_id
    user_data = await state.get_data()
    user_props = user_data['userprops']
    channel_post_id = await message.bot.send_photo(chat_id=-1002152010360,
                                                   caption=f"Номер заявки: {user_props.task_id}\n"
                                                           f"Объект: {user_data['object']}\n"
                                                           f"Субобъект: {user_data['subject']}\n"
                                                           f"Система: {user_data['system']}\n"
                                                           f"Этаж: {user_data['flor']}\n"
                                                           f"Помещение: {user_data['room']}\n"
                                                           f"Инцидент: {user_data['incident']}\n"
                                                           f"Приоритет: {user_data['priority']}\n"
                                                           f"Комментарий: {user_data['comment']}\n",
                                                   photo=photo)
    await message.answer(text=f"Задача: {channel_post_id.message_id} создана.")
    users_list = [1344084119, 186208978, 223663162]
    # users_list = [5175421239, 1344084119]
    for user in users_list:
        await message.bot.forward_message(chat_id=user,
                                          from_chat_id=-1002152010360,
                                          message_id=channel_post_id.message_id)
    await state.clear()


@router.message(StateFilter(NewTask.photo), VerifyUser(user_id))
async def new_task(message: Message):
    await message.answer(text=f"Прикрепить фотографию?", reply_markup=get_photo_kb())
