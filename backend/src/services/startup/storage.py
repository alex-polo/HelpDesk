import os

from src.config import StorageConfig


def verify_storage(storage_config: StorageConfig) -> None:
    if os.path.exists(os.path.join(os.getcwd(), storage_config.storage_folder)) is False:
        os.mkdir(os.path.join(os.getcwd(), storage_config.storage_folder))
