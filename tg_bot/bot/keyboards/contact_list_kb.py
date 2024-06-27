import json

from aiogram.filters.callback_data import CallbackData
from aiogram.types import InlineKeyboardButton
from aiogram.utils.keyboard import InlineKeyboardBuilder

from botapi import get_contacts


class CallbackContactClass(CallbackData, prefix='contact'):
    name: str
    phone: str
    role: str


async def get_contacts_kb(tg_id: int):
    contact_list_kb = InlineKeyboardBuilder()
    contact_list = await get_contacts(tg_id)
    for contact in contact_list:
        contact_list_kb.add(InlineKeyboardButton(
            text=f"{contact["name"]} {contact["role"]}",
            callback_data=CallbackContactClass(
                name=contact["name"], phone=contact["phone"], role=contact["role"]).pack()
            )
        )
    return contact_list_kb.adjust(1).as_markup()
