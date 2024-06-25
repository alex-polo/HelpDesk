from aiogram.types import ReplyKeyboardMarkup, InlineKeyboardButton
from aiogram.utils.keyboard import ReplyKeyboardBuilder, InlineKeyboardBuilder


def get_main_menu_kb() -> ReplyKeyboardMarkup:
    kb = ReplyKeyboardBuilder()
    kb.button(text="Создать заявку")
    kb.button(text="Контакты")
    kb.button(text="Открытые заявки")
    kb.adjust(2)
    return kb.as_markup(resize_keyboard=True)

