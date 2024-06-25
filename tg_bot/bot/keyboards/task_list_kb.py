import json

from aiogram.filters.callback_data import CallbackData
from aiogram.types import InlineKeyboardButton
from aiogram.utils.keyboard import InlineKeyboardBuilder


class CallbackTaskListClass(CallbackData, prefix='task_list'):
    numb: str
    status: str
    post_id: int


async def get_task_list():
    pass


async def get_task_list_kb():
    task_list_kb = InlineKeyboardBuilder()
    # task_list = await get_task_list()
    taskl = """[{"numb": "1", "status": "Просрочена", "post_id": 11}, 
                {"numb": "2", "status": "Срочная", "post_id": 11}]"""
    task_list = json.loads(taskl)
    for task in task_list:
        task_list_kb.add(InlineKeyboardButton(
            text=f"Заявка №: {task["numb"]} Статус: {task["status"]}",
            callback_data=CallbackTaskListClass(
                numb=task["numb"], status=task["status"], post_id=task["post_id"]).pack()
            )
        )
    return task_list_kb.adjust(1).as_markup()
