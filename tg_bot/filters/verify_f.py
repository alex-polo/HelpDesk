from aiogram.filters import BaseFilter
from aiogram.types import Message

from tg_bot.botapi.auth import get_users_list

# user_id: list[int] = [5175421239, 1344084119, 186208978, 223663162]
user_id = await get_users_list()


class VerifyUser(BaseFilter):
    def __init__(self, user_id: list[int]) -> None:
        self.user_id = user_id

    async def __call__(self, message: Message) -> bool:
        return message.from_user.id in self.user_id