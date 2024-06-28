
import bot
from config import ApiCredentials, BotConfig, Endpoints, get_endpoints_config, get_bot_config, get_api_credentials, \
    BotChannel, get_channel_id_config

if __name__ == '__main__':
    try:
        # Конфигурирция логгера
        # logging_config = get_logger_config()
        # configure_logger(logger_config=logging_config)

        bot_credentials: ApiCredentials = get_api_credentials()
        bot_config: BotConfig = get_bot_config()
        bot_endpoints: Endpoints = get_endpoints_config()
        bot_channel: BotChannel = get_channel_id_config()
        if len(bot_config.token) == 0:
            raise Exception('Не найден токен')
        bot.run(bot_config=bot_config)


    except (KeyboardInterrupt, SystemExit):
        # logger.error("Bot stopped!")
        pass
    except Exception as ex:
        print(ex)
        # logger.error(ex)
        # logger.error(traceback.format_exc(limit=None, chain=True))
        pass


