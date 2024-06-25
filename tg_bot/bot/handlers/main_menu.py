from aiogram import Router, F, types
from aiogram.filters import CommandStart
from aiogram.types import Message, message

from bot.filters.verify_f import VerifyUser, user_id
from botapi import get_tg_user_role
from bot.keyboards import main_menu_kb, get_contacts_kb, get_task_list_kb, CallbackContactClass, CallbackTaskListClass

router = Router()


@router.message(CommandStart(), VerifyUser(user_id))
async def cmd_start(message: Message):
    data = await get_tg_user_role(message.from_user.id)
    if data is not None:
        await message.answer(text=f"Добро пожаловать {data}", reply_markup=main_menu_kb.get_main_menu_kb())
    else:
        await message.answer(text=f"Пожалуйста, сообщите ваш id администратору. Ваш id:{message.from_user.id}")


@router.message(F.text == "Открытые заявки")
async def cmd_contacts(message: Message):
    await message.answer(text=f"Список открытых заявок", reply_markup=await get_task_list_kb())


@router.message(F.text == "Контакты")
async def cmd_contacts(message: Message):
    await message.answer(text=f"Список контактов", reply_markup=await get_contacts_kb())


@router.callback_query(CallbackContactClass.filter())
async def show_contact(callback: types.CallbackQuery,
                       callback_data: CallbackContactClass):
    await callback.message.answer(text=f"Данные сотрудника:"
                                       f"\nИмя: {callback_data.name}"
                                       f"\nТелефон: +7{callback_data.tel}"
                                       f"\nДолжность: {callback_data.role}")


@router.callback_query(CallbackTaskListClass.filter())
async def show_task(callback: types.CallbackQuery,
                    callback_data: CallbackTaskListClass):
    await callback.message.bot.forward_message(chat_id=callback.from_user.id, from_chat_id=-1002152010360,
                                               message_id=callback_data.post_id)
