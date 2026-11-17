import AppController from '@readynode/app/AppController';
import Logger, { LOG_LEVEL } from '@readynode/logger/Logger';

Logger.setLogLevel(LOG_LEVEL.INFO);
const app_controller = new AppController();
app_controller.run();
