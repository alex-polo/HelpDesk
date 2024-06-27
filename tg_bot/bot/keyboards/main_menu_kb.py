from aiogram.types import ReplyKeyboardMarkup
from aiogram.utils.keyboard import ReplyKeyboardBuilder


def get_main_menu_kb() -> ReplyKeyboardMarkup:
    kb = ReplyKeyboardBuilder()
    kb.button(text="Создать заявку")
    kb.button(text="Контакты")
    kb.button(text="Открытые заявки")
    kb.adjust(2)
    return kb.as_markup(resize_keyboard=True)


def get_feedback_kb() -> ReplyKeyboardMarkup:
    kb = ReplyKeyboardBuilder()
    # kb.button(text="Оставить обратную связь")
    kb.button(text="Главное меню")
    kb.adjust(1)
    return kb.as_markup(resize_keyboard=True)
