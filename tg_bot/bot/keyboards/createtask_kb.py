from aiogram.types import ReplyKeyboardMarkup, KeyboardButton
from aiogram.utils.keyboard import ReplyKeyboardBuilder

from bot.keyboards import Props

backbutton: str = "Назад"


async def get_object_kb(data: Props) -> ReplyKeyboardMarkup:
    object_list_kb = ReplyKeyboardBuilder()
    for obj in data.object:
        object_list_kb.button(text=f"{obj}")
    object_list_kb.adjust(2)
    object_list_kb.row(KeyboardButton(text=backbutton))
    return object_list_kb.as_markup(resize_keyboard=True)


async def get_subject_kb(data: Props) -> ReplyKeyboardMarkup:
    subject_list_kb = ReplyKeyboardBuilder()
    buttonlen: int = 1
    #
    # if (len(data.subject)) > 1:
    #     count = len(data.subject) % 2
    #
    #     index = 0
    #     for _ in range(0, count):
    #         if index
    #         subject_list_kb.button(text=f"{data.subject[index + 1]}")
    #         subject_list_kb.adjust(buttonlen)
    if (len(data.subject) % 2) == 0:
        buttonlen = 2

    if (len(data.subject) % 3) == 0:
        buttonlen = 3

    if (len(data.subject) % 3) == 1:
        buttonlen = 2

    if (len(data.subject) % 2) == 1:
        buttonlen = 3

    for sbj in data.subject:
        subject_list_kb.button(text=f"{sbj}")

    subject_list_kb.adjust(buttonlen)
    subject_list_kb.row(KeyboardButton(text=backbutton))
    return subject_list_kb.as_markup(resize_keyboard=True)


async def get_system_kb(data: Props) -> ReplyKeyboardMarkup:
    system_list_kb = ReplyKeyboardBuilder()
    for stm in data.system:
        system_list_kb.button(text=f"{stm}")
    system_list_kb.adjust(2)
    system_list_kb.row(KeyboardButton(text=backbutton))
    return system_list_kb.as_markup(resize_keyboard=True)


async def get_incident_kb(data: Props) -> ReplyKeyboardMarkup:
    incident_list_kb = ReplyKeyboardBuilder()
    for inc in data.incident:
        incident_list_kb.button(text=f"{inc}")
    incident_list_kb.adjust(2)
    incident_list_kb.row(KeyboardButton(text=backbutton))
    return incident_list_kb.as_markup(resize_keyboard=True)


async def get_priority_kb(data: Props) -> ReplyKeyboardMarkup:
    priority_list_kb = ReplyKeyboardBuilder()
    for prt in data.priority:
        priority_list_kb.button(text=f"{prt}")
    priority_list_kb.adjust(2)
    priority_list_kb.row(KeyboardButton(text=backbutton))
    return priority_list_kb.as_markup(resize_keyboard=True)


def get_photo_kb() -> ReplyKeyboardMarkup:
    kb = ReplyKeyboardBuilder()
    kb.button(text="Прикрепить фотографию")
    kb.button(text="Продолжить без фотографии")
    kb.adjust(2)
    kb.row(KeyboardButton(text=backbutton))
    return kb.as_markup(resize_keyboard=True)


def get_flor_kb() -> ReplyKeyboardMarkup:
    kb = ReplyKeyboardBuilder()
    kb.button(text="Весь этаж")
    kb.row(KeyboardButton(text=backbutton))
    return kb.as_markup(resize_keyboard=True)


def backbutton_kb() -> ReplyKeyboardMarkup:
    kb = ReplyKeyboardBuilder()
    kb.row(KeyboardButton(text=backbutton))
    return kb.as_markup(resize_keyboard=True)
