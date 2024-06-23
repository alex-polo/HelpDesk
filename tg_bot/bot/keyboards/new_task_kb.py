from aiogram.types import InlineKeyboardButton
from aiogram.utils.keyboard import InlineKeyboardBuilder


async def get_building_list():
    pass


class CallbackBuyClass(CallbackData, prefix='big_buy_data'):
    name: str


async def get_buy_list_kb():
    buy_list_kb = InlineKeyboardBuilder()
    buy_list = await get_buiding_list()
    for buying in buy_list:
        buy_list_kb.add(InlineKeyboardButton(
            text=buying.name,
            callback_data=CallbackBuyClass(
                name=buying.name).pack()
            )
        )
    return buy_list_kb.adjust(1).as_markup()