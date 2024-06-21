from aiogram.filters.callback_data import CallbackData
from aiogram.types import InlineKeyboardButton
from aiogram.utils.keyboard import InlineKeyboardBuilder


class CallbackTaskListClass(CallbackData, prefix='task_list'):
    name: str
    data: int


async def get_task_list():
    pass


async def get_task_list_kb():
    task_list_kb = InlineKeyboardBuilder()
    task_list = await get_task_list()
    for task in task_list:
        task_list_kb.add(InlineKeyboardButton(
            text=task.name,
            callback_data=CallbackTaskListClass(
                name=task.name, data=task.data).pack()
            )
        )
    return task_list_kb.adjust(1).as_markup()
