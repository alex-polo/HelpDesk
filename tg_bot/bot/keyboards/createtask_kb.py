from dataclasses import dataclass

from aiogram.types import ReplyKeyboardMarkup, KeyboardButton
from aiogram.utils.keyboard import ReplyKeyboardBuilder

backbutton: str = "Назад"


@dataclass
class Props:
    object: list
    subject: list
    system: list
    incident: list
    priority: list
    task_id: int
    role: str


async def get_object_kb(data: Props) -> ReplyKeyboardMarkup:
    object_list_kb = ReplyKeyboardBuilder()
    buttonlen: int = 1

    if (len(data.subject) % 2) == 0:
        buttonlen = 2

    if (len(data.subject) % 3) == 0:
        buttonlen = 3

    if (len(data.subject) % 3) == 1:
        buttonlen = 2

    if (len(data.subject) % 2) == 1:
        buttonlen = 3
    for obj in data.object:
        object_list_kb.button(text=f"{obj}")
    object_list_kb.adjust(buttonlen)
    object_list_kb.row(KeyboardButton(text=backbutton))
    return object_list_kb.as_markup(resize_keyboard=True)


async def get_subject_kb(data: Props) -> ReplyKeyboardMarkup:
    subject_list_kb = ReplyKeyboardBuilder()
    buttonlen: int = 1

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
    buttonlen: int = 1

    if (len(data.subject) % 2) == 0:
        buttonlen = 2

    if (len(data.subject) % 3) == 0:
        buttonlen = 3

    if (len(data.subject) % 3) == 1:
        buttonlen = 2

    if (len(data.subject) % 2) == 1:
        buttonlen = 3
    for stm in data.system:
        system_list_kb.button(text=f"{stm}")
    system_list_kb.adjust(buttonlen)
    system_list_kb.row(KeyboardButton(text=backbutton))
    return system_list_kb.as_markup(resize_keyboard=True)


async def get_incident_kb(data: Props) -> ReplyKeyboardMarkup:
    incident_list_kb = ReplyKeyboardBuilder()
    buttonlen: int = 1

    if (len(data.subject) % 2) == 0:
        buttonlen = 2

    if (len(data.subject) % 3) == 0:
        buttonlen = 3

    if (len(data.subject) % 3) == 1:
        buttonlen = 2

    if (len(data.subject) % 2) == 1:
        buttonlen = 3
    for inc in data.incident:
        incident_list_kb.button(text=f"{inc}")
    incident_list_kb.adjust(buttonlen)
    incident_list_kb.row(KeyboardButton(text=backbutton))
    return incident_list_kb.as_markup(resize_keyboard=True)


async def get_priority_kb(data: Props) -> ReplyKeyboardMarkup:
    priority_list_kb = ReplyKeyboardBuilder()
    buttonlen: int = 1

    if (len(data.subject) % 2) == 0:
        buttonlen = 2

    if (len(data.subject) % 3) == 0:
        buttonlen = 3

    if (len(data.subject) % 3) == 1:
        buttonlen = 2

    if (len(data.subject) % 2) == 1:
        buttonlen = 3
    for prt in data.priority:
        priority_list_kb.button(text=f"{prt}")
    priority_list_kb.adjust(buttonlen)
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
