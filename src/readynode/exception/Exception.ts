import Logger from '@readynode/logger/Logger';

export class Exception extends Error {
    constructor(p_message: string);
    constructor(p_message: string, p_is_logger: boolean);

    constructor(p_message: string, p_is_logger: boolean = true) {
        super(p_message);
        this.name = 'Exception';
        if (p_is_logger) {
            Logger.logError(p_message, 4);
        } else {
            Logger.logDebug(p_message, 4);
        }
    }
}
