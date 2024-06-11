# from typing import Optional
#
# from config import Endpoints, ApiCredentials
#
# print(111)
# ENDPOINTS: Optional[Endpoints] = None
# AC: Optional[ApiCredentials] = None
# TOKEN: str = ''
#
#
# def set_endpoints(endpoints_config: Endpoints) -> None:
#     global ENDPOINTS
#
#     ENDPOINTS = endpoints_config
#     print(2222)
#
#
# def get_endpoints():
#     print(3333)
#     return ENDPOINTS
from typing import Optional

from config import Endpoints


class APIParams(object):
    _instance = None

    # def __new__(cls):
    #     if cls._instance is None:
    #         cls._instance = super(APIParams, cls).__new__(cls)
    #     return cls._instance
    #
    # def __init__(self):
    #     self.ENDPOINTS: Optional[Endpoints] = None
    #
    # def set_endpoints(self, endpoints_config: Endpoints):
    #     self.ENDPOINTS = endpoints_config
    #
    # def get_endpoints(self):
    #     return self.get_endpoints()

