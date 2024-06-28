import os

from aiogram import Router, F, types
from aiogram.filters import CommandStart
from aiogram.fsm import state
from aiogram.fsm.context import FSMContext
from aiogram.types import Message, message
from dotenv import load_dotenv

from bot.filters.verify_f import VerifyUser, user_id
from botapi import get_tg_user_role, close_appeal
from bot.keyboards import (main_menu_kb, get_contacts_kb, get_task_list_kb, CallbackContactClass,
                           CallbackTaskListClass, CallbackAppealMenuClass, get_task_menu_kb)

router = Router()

load_dotenv()
chanel_id = os.getenv('CHANNEL_ID')


@router.message(F.text == "Главное меню")
@router.message(CommandStart())
async def cmd_start(message: Message, state: FSMContext):
    data = await get_tg_user_role(message.from_user.id)
    await state.clear()
    if data is not None:
        await message.answer(text=f"Добро пожаловать {data}", reply_markup=main_menu_kb.get_main_menu_kb())
    else:
        await message.answer(text=f"Пожалуйста, сообщите ваш id администратору. Ваш id:{message.from_user.id}")



@router.message(F.text == "Открытые заявки")
async def cmd_contacts(message: Message):
    data = await get_tg_user_role(message.from_user.id)
    if data is not None:
        await message.answer(text=f"Список открытых заявок",
                             reply_markup=await get_task_list_kb(tg_id=message.from_user.id, status="all"))
    else:
        await message.answer(text=f"Пожалуйста, сообщите ваш id администратору. Ваш id:{message.from_user.id}")


@router.message(F.text == "Контакты")
async def cmd_contacts(message: Message):
    data = await get_tg_user_role(message.from_user.id)
    if data is not None:
        await message.answer(text=f"Список контактов", reply_markup=await get_contacts_kb(message.from_user.id))
    else:
        await message.answer(text=f"Пожалуйста, сообщите ваш id администратору. Ваш id:{message.from_user.id}")


@router.callback_query(CallbackContactClass.filter())
async def show_contact(callback: types.CallbackQuery,
                       callback_data: CallbackContactClass):
    await callback.message.answer(text=f"Данные сотрудника:"
                                       f"\nИмя: {callback_data.name}"
                                       f"\nТелефон: +7{callback_data.phone}"
                                       f"\nДолжность: {callback_data.role}")


@router.callback_query(CallbackTaskListClass.filter())
async def show_task(callback: types.CallbackQuery,
                    callback_data: CallbackTaskListClass):
    await callback.message.bot.forward_message(chat_id=callback.from_user.id, from_chat_id=chanel_id,
                                               message_id=callback_data.chanel_post_id)
    await callback.message.answer(text="Меню заявки",
                                  reply_markup=await get_task_menu_kb(tg_id=callback.from_user.id,
                                                                      task_id=callback_data.task_id))


@router.callback_query(CallbackAppealMenuClass.filter())
async def show_task(callback: types.CallbackQuery,
                    callback_data: CallbackAppealMenuClass):
    await close_appeal(tg_id=callback.from_user.id, task_id=callback_data.task_id)
    await callback.message.answer(text="Заявка закрыта")
