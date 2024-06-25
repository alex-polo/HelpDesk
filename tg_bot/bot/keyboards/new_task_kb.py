import json
from dataclasses import dataclass

from aiogram.filters.callback_data import CallbackData
from aiogram.types import InlineKeyboardButton, ReplyKeyboardMarkup
from aiogram.utils.keyboard import InlineKeyboardBuilder, ReplyKeyboardBuilder


@dataclass
class Props:
    object: list
    subject: list
    system: list
    incident: list
    priority: list
    task_id: int
    role: str


async def get_building_list():
    pass


class CallbackObjectList(CallbackData, prefix='obj'):
    obj: str


class CallbackSubjectList(CallbackData, prefix='sbj'):
    sbj: str


class CallbackSystemList(CallbackData, prefix='system'):
    system: str


class CallbackIncidentList(CallbackData, prefix='incident'):
    incident: str


class CallbackPriorityList(CallbackData, prefix='priority'):
    priority: str


async def get_object_kb(data: Props):
    object_list_kb = InlineKeyboardBuilder()
    for obj in data.object:
        object_list_kb.add(InlineKeyboardButton(
            text=f"#{obj}",
            callback_data=CallbackObjectList(
                obj=obj).pack()
            )
        )
    return object_list_kb.adjust(1).as_markup()


async def get_subject_kb(data: Props):
    subject_list_kb = InlineKeyboardBuilder()
    for sbj in data.subject:
        subject_list_kb.add(InlineKeyboardButton(
            text=f"#{sbj}",
            callback_data=CallbackSubjectList(
                sbj=sbj).pack()
            )
        )
    return subject_list_kb.adjust(1).as_markup()


async def get_system_kb(data: Props):
    system_list_kb = InlineKeyboardBuilder()
    for stm in data.system:
        system_list_kb.add(InlineKeyboardButton(
            text=f"#{stm}",
            callback_data=CallbackSystemList(
                system=stm).pack()
            )
        )
    return system_list_kb.adjust(1).as_markup()


async def get_incident_kb(data: Props):
    incident_list_kb = InlineKeyboardBuilder()
    for inc in data.incident:
        incident_list_kb.add(InlineKeyboardButton(
            text=f"#{inc}",
            callback_data=CallbackIncidentList(
                incident=inc).pack()
            )
        )
    return incident_list_kb.adjust(1).as_markup()


async def get_priority_kb(data: Props):
    priority_list_kb = InlineKeyboardBuilder()
    for prt in data.priority:
        priority_list_kb.add(InlineKeyboardButton(
            text=f"#{prt}",
            callback_data=CallbackPriorityList(
                priority=prt).pack()
            )
        )
    return priority_list_kb.adjust(1).as_markup()


def get_photo_kb() -> ReplyKeyboardMarkup:
    kb = ReplyKeyboardBuilder()
    kb.button(text="Прикрепить фотографию")
    kb.button(text="Продолжить без фотографии")
    kb.adjust(2)
    return kb.as_markup(resize_keyboard=True)
