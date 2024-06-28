import datetime
import os

from aiogram import Router, F
from aiogram.filters import StateFilter
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import StatesGroup, State
from aiogram.types import Message
from dotenv import load_dotenv

from bot.filters.verify_f import VerifyUser, user_id
from bot.keyboards import (get_object_kb, get_photo_kb, get_subject_kb, get_priority_kb, get_incident_kb, get_system_kb,
                           Props, get_flor_kb, backbutton, backbutton_kb, main_menu_kb)
from botapi import get_tg_user_role, get_tg_user_appeal_params, post_tg_create_appeal
from botapi.requests import post_tg_update_appeal_chanel_post_id, add_photo

router = Router()

load_dotenv()
chanel_id = os.getenv('CHANNEL_ID')


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


@router.message(F.text == backbutton, StateFilter(NewTask.subject))
@router.message(F.text == "Создать заявку", StateFilter(None), VerifyUser(user_id))
async def new_task(message: Message, state: FSMContext):
    await state.set_state(NewTask.userprops)
    if message.text == backbutton:
        pass
    else:
        propsapi = await get_tg_user_appeal_params(message.from_user.id)
        props = Props(object=propsapi['object'],
                      subject=propsapi['subject'],
                      system=propsapi['system'],
                      incident=propsapi['incident'],
                      priority=propsapi['priority'],
                      task_id=1111,
                      role="Инженер")
        await state.update_data(userprops=props)
    user_data = await state.get_data()
    await message.answer(text=f"Выберите объект",
                         reply_markup=await get_object_kb(user_data['userprops']))
    await state.set_state(NewTask.object)


@router.message(F.text == backbutton, StateFilter(NewTask.system))
@router.message(F.text != backbutton, StateFilter(NewTask.object))
async def choose_object(message: Message, state: FSMContext):
    user_data = await state.get_data()
    user_props = user_data['userprops']
    if message.text == backbutton:
        pass
    elif message.text not in user_props.object:
        await message.answer(text="Воспользуйтесь клавиатурой")
        return
    else:
        await state.update_data(object=message.text)
    user_data = await state.get_data()
    await message.answer(text=f"Объект: #{user_data['object']}\n\n"
                              f"Выберите субъект", reply_markup=await get_subject_kb(user_data['userprops']))
    await state.set_state(NewTask.subject)


@router.message(F.text == backbutton, StateFilter(NewTask.flor))
@router.message(F.text != backbutton, StateFilter(NewTask.subject))
async def choose_subject(message: Message, state: FSMContext):
    user_data = await state.get_data()
    user_props = user_data['userprops']
    if message.text == backbutton:
        pass
    elif message.text not in user_props.subject:
        await message.answer(text="Воспользуйтесь клавиатурой")
        return
    else:
        await state.update_data(subject=message.text)
    user_data = await state.get_data()
    await message.answer(text=f"Объект: #{user_data['object']}\n"
                              f"Субъект: #{user_data['subject']}\n\n"
                              f"Выберите систему", reply_markup=await get_system_kb(user_data['userprops']))
    await state.set_state(NewTask.system)


@router.message(F.text == backbutton, StateFilter(NewTask.room))
@router.message(F.text != backbutton, StateFilter(NewTask.system))
async def choose_subject(message: Message, state: FSMContext):
    user_data = await state.get_data()
    user_props = user_data['userprops']
    if message.text == backbutton:
        pass
    elif message.text not in user_props.system:
        await message.answer(text="Воспользуйтесь клавиатурой")
        return
    else:
        await state.update_data(system=message.text)
    user_data = await state.get_data()
    await message.answer(text=f"Объект: #{user_data['object']}\n"
                              f"Субъект: #{user_data['subject']}\n"
                              f"Система: #{user_data['system']}\n\n"
                              f"Введите этаж", reply_markup=backbutton_kb())
    await state.set_state(NewTask.flor)


@router.message(F.text == backbutton, StateFilter(NewTask.incident))
@router.message(F.text != backbutton, StateFilter(NewTask.flor))
async def get_flor(message: Message, state: FSMContext):
    if message.text == backbutton:
        pass
    else:
        await state.update_data(flor=message.text)
    user_data = await state.get_data()
    await message.answer(text=f"Объект: #{user_data['object']}\n"
                              f"Субъект: #{user_data['subject']}\n"
                              f"Система: #{user_data['system']}\n"
                              f"#Этаж_{user_data['flor']}\n\n"
                              f"Уточните местоположение/укажите помещение", reply_markup=get_flor_kb())
    await state.set_state(NewTask.room)


@router.message(F.text == backbutton, StateFilter(NewTask.priority))
@router.message(F.text != backbutton, StateFilter(NewTask.room))
async def get_room(message: Message, state: FSMContext):
    if message.text == backbutton:
        pass
    else:
        await state.update_data(room=message.text)
    user_data = await state.get_data()
    room_index: str = "#Помещение_"
    if user_data['room'] == "Весь этаж":
        room_index = ""
    await message.answer(text=f"Объект: #{user_data['object']}\n"
                              f"Субъект: #{user_data['subject']}\n"
                              f"Система: #{user_data['system']}\n"
                              f"#Этаж_{user_data['flor']}\n"
                              f"{room_index}{user_data['room']}\n\n"
                              f"Выберите тип события", reply_markup=await get_incident_kb(user_data['userprops']))
    await state.set_state(NewTask.incident)


@router.message(F.text == backbutton, StateFilter(NewTask.comment))
@router.message(F.text != backbutton, StateFilter(NewTask.incident))
async def get_inc(message: Message, state: FSMContext):
    user_data = await state.get_data()
    user_props = user_data['userprops']
    if message.text == backbutton:
        pass
    elif message.text not in user_props.incident:
        await message.answer(text="Воспользуйтесь клавиатурой")
        return
    else:
        await state.update_data(incident=message.text)
    user_data = await state.get_data()
    room_index: str = "#Помещение_"
    if user_data['room'] == "Весь этаж":
        room_index = ""
    await message.answer(text=f"Объект: #{user_data['object']}\n"
                              f"Субъект: #{user_data['subject']}\n"
                              f"Система: #{user_data['system']}\n"
                              f"#Этаж_{user_data['flor']}\n"
                              f"{room_index}{user_data['room']}\n"
                              f"Инцидент: #{user_data['incident']}\n\n"
                              f"Выберите приоритет", reply_markup=await get_priority_kb(user_data['userprops']))
    await state.set_state(NewTask.priority)


@router.message(F.text == backbutton, StateFilter(NewTask.photo))
@router.message(F.text != backbutton, StateFilter(NewTask.priority))
async def get_flor(message: Message, state: FSMContext):
    user_data = await state.get_data()
    user_props = user_data['userprops']
    if message.text == backbutton:
        pass
    elif message.text not in user_props.priority:
        await message.answer(text="Воспользуйтесь клавиатурой")
        return
    else:
        await state.update_data(priority=message.text)
    user_data = await state.get_data()
    room_index: str = "#Помещение_"
    if user_data['room'] == "Весь этаж":
        room_index = ""
    await message.answer(text=f"Объект: #{user_data['object']}\n"
                              f"Субъект: #{user_data['subject']}\n"
                              f"Система: #{user_data['system']}\n"
                              f"#Этаж_{user_data['flor']}\n"
                              f"{room_index}{user_data['room']}\n"
                              f"Инцидент: #{user_data['incident']}\n"
                              f"Приоритет: #{user_data['priority']}\n\n"
                              f"Введите комментарий", reply_markup=backbutton_kb())
    await state.set_state(NewTask.comment)


@router.message(F.text == backbutton, StateFilter(NewTask.getphoto))
@router.message(F.text != backbutton, StateFilter(NewTask.comment))
async def get_flor(message: Message, state: FSMContext):
    if message.text == backbutton:
        pass
    else:
        await state.update_data(comment=message.text)
    user_data = await state.get_data()
    room_index: str = "#Помещение_"
    if user_data['room'] == "Весь этаж":
        room_index = ""
    await message.answer(text=f"Объект: #{user_data['object']}\n"
                              f"Субъект: #{user_data['subject']}\n"
                              f"Система: #{user_data['system']}\n"
                              f"#Этаж_{user_data['flor']}\n"
                              f"{room_index}{user_data['room']}\n"
                              f"Инцидент: #{user_data['incident']}\n"
                              f"Приоритет: #{user_data['priority']}\n"
                              f"Комментарий: {user_data['comment']}\n\n"
                              f"Прикрепить фотографию?", reply_markup=get_photo_kb())
    await state.set_state(NewTask.photo)


@router.message(F.text == "Продолжить без фотографии", StateFilter(NewTask.photo))
async def post_task(message: Message, state: FSMContext):
    user_data = await state.get_data()
    room_index: str = "#Помещение_"
    if user_data['room'] == "Весь этаж":
        room_index = ""
    dt = datetime.datetime.now()
    post_resp = await post_tg_create_appeal(time=dt.timestamp(),
                                            object=user_data['object'],
                                            subject=user_data['subject'],
                                            system=user_data['system'],
                                            flour=user_data['flor'],
                                            room=user_data['room'],
                                            incident=user_data['incident'],
                                            priority=user_data['priority'],
                                            comment=user_data['comment'])
    channel_post_id = await message.bot.send_message(chat_id=chanel_id,
                                                     text=f"Номер заявки: {post_resp['task_id']}\n"
                                                          f"#Дата_{dt.strftime('%d_%m_%Y %H:%M')}\n"
                                                          f"Объект: #{user_data['object']}\n"
                                                          f"Субъект: #{user_data['subject']}\n"
                                                          f"Система: #{user_data['system']}\n"
                                                          f"#Этаж_{user_data['flor']}\n"
                                                          f"{room_index}{user_data['room']}\n"
                                                          f"Инцидент: #{user_data['incident']}\n"
                                                          f"Приоритет: #{user_data['priority']}\n"
                                                          f"Комментарий: {user_data['comment']}\n")
    await post_tg_update_appeal_chanel_post_id(task_id=post_resp['task_id'],
                                               channel_post_id=channel_post_id.message_id)
    await message.answer(text=f"Задача: {post_resp['task_id']} создана.")
    users_list = post_resp['user_list']
    for user in users_list:
        await message.bot.forward_message(chat_id=user,
                                          from_chat_id=chanel_id,
                                          message_id=channel_post_id.message_id)
    await state.clear()


@router.message(F.text == "Прикрепить фотографию", StateFilter(NewTask.photo), VerifyUser(user_id))
async def photo_wait(message: Message, state: FSMContext):
    user_data = await state.get_data()
    room_index: str = "#Помещение_"
    if user_data['room'] == "Весь этаж":
        room_index = ""
    user_props = user_data['userprops']
    await message.answer(text=f"Номер заявки: {user_props.task_id}\n"
                              f"Объект: #{user_data['object']}\n"
                              f"Субъект: #{user_data['subject']}\n"
                              f"Система: #{user_data['system']}\n"
                              f"Этаж: #Э_{user_data['flor']}\n"
                              f"{room_index}{user_data['room']}\n"
                              f"Инцидент: #{user_data['incident']}\n"
                              f"Приоритет: #{user_data['priority']}\n"
                              f"Комментарий: {user_data['comment']}\n\n"
                              f"Загрузите фотографию",
                         reply_markup=backbutton_kb())
    await state.set_state(NewTask.getphoto)


@router.message(StateFilter(NewTask.getphoto), VerifyUser(user_id))
async def post_task(message: Message, state: FSMContext):
    photo = message.photo[-1].file_id
    user_data = await state.get_data()
    room_index: str = "#Помещение_"
    if user_data['room'] == "Весь этаж":
        room_index = ""
    user_props = user_data['userprops']
    path = f"local_storage/{user_props.task_id}.png"
    dt = datetime.datetime.now()
    post_resp = await post_tg_create_appeal(time=dt.timestamp(),
                                            object=user_data['object'],
                                            subject=user_data['subject'],
                                            system=user_data['system'],
                                            flour=user_data['flor'],
                                            room=user_data['room'],
                                            incident=user_data['incident'],
                                            priority=user_data['priority'],
                                            comment=user_data['comment'])
    # await message.bot.download(message.photo[-1], destination=path)
    # await message.answer(text=path)
    # await add_photo(file=path)
    channel_post_id = await message.bot.send_photo(chat_id=chanel_id,
                                                   caption=f"Номер заявки: {user_props.task_id}\n"
                                                           f"#Дата_{dt.strftime('%d_%m_%Y %H:%M')}\n"
                                                           f"Объект: #{user_data['object']}\n"
                                                           f"Субъект: #{user_data['subject']}\n"
                                                           f"Система: #{user_data['system']}\n"
                                                           f"#Этаж_{user_data['flor']}\n"
                                                           f"{room_index}{user_data['room']}\n"
                                                           f"Инцидент: #{user_data['incident']}\n"
                                                           f"Приоритет: #{user_data['priority']}\n"
                                                           f"Комментарий: {user_data['comment']}\n",
                                                   photo=photo)
    await post_tg_update_appeal_chanel_post_id(task_id=post_resp['task_id'],
                                               channel_post_id=channel_post_id.message_id)
    await message.answer(text=f"Задача: {post_resp['task_id']} создана.")
    # await os.remove(path=path)
    users_list = post_resp['user_list']
    for user in users_list:
        await message.bot.forward_message(chat_id=user,
                                          from_chat_id=chanel_id,
                                          message_id=channel_post_id.message_id)
    await state.clear()


@router.message(F.text == backbutton, StateFilter(NewTask.object))
async def cmd_start(message: Message, state: FSMContext):
    data = await get_tg_user_role(message.from_user.id)
    if data is not None:
        await message.answer(text=f"Добро пожаловать {data}", reply_markup=main_menu_kb.get_main_menu_kb())
    else:
        await message.answer(text=f"Пожалуйста, сообщите ваш id администратору. Ваш id:{message.from_user.id}")
    await state.clear()
