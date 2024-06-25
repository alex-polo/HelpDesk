import json

from aiogram.filters.callback_data import CallbackData
from aiogram.types import InlineKeyboardButton
from aiogram.utils.keyboard import InlineKeyboardBuilder


async def get_contacts():
    pass


class CallbackContactClass(CallbackData, prefix='contact'):
    name: str
    tel: str
    role: str


async def get_contacts_kb():
    contact_list_kb = InlineKeyboardBuilder()
    # contact_list = await get_contacts()
    cont = """[{"name": "Антониан", "tel": "9117890510", "role": "Инженер"}, 
                {"name": "Евкурий", "tel": "9117890511", "role": "Техник"}]"""
    contact_list = json.loads(cont)
    for contact in contact_list:
        contact_list_kb.add(InlineKeyboardButton(
            text=f"{contact["name"]} {contact["role"]}",
            callback_data=CallbackContactClass(
                name=contact["name"], tel=contact["tel"], role=contact["role"]).pack()
            )
        )
    return contact_list_kb.adjust(1).as_markup()
