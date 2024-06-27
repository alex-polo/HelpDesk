import json

from aiogram.filters.callback_data import CallbackData
from aiogram.types import InlineKeyboardButton
from aiogram.utils.keyboard import InlineKeyboardBuilder

from botapi import get_appeals


class CallbackTaskListClass(CallbackData, prefix='task_list'):
    task_id: str
    chanel_post_id: int
    priority: str


class CallbackAppealMenuClass(CallbackData, prefix='appeal_menu'):
    tg_id: int
    task_id: str


async def get_task_list_kb(tg_id: int, status: str):
    task_list_kb = InlineKeyboardBuilder()
    task_list = await get_appeals(tg_id, status)
    for task in task_list:
        task_list_kb.add(InlineKeyboardButton(
            text=f"Заявка №: {task["task_id"]} Статус: {task["priority"]}",
            callback_data=CallbackTaskListClass(
                task_id=task["task_id"], chanel_post_id=task["chanel_post_id"], priority=task["priority"]).pack()
            )
        )
    return task_list_kb.adjust(1).as_markup()


async def get_task_menu_kb(tg_id: int, task_id: str):
    task_list_kb = InlineKeyboardBuilder()
    task_list_kb.add(InlineKeyboardButton(text=f"Закрыть обращение",
                                          callback_data=CallbackAppealMenuClass(tg_id=tg_id, task_id=task_id).pack()))
    return task_list_kb.adjust(1).as_markup()
