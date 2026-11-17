export enum LOG_LEVEL {
    TRACE = 0,
    DEBUG = 1,
    INFO = 2,
    WARN = 4,
    ERROR = 5
}

export default class Logger {
    private static m_log_level: LOG_LEVEL = LOG_LEVEL.INFO;

    public static setLogLevel(p_level: LOG_LEVEL): void {
        this.m_log_level = p_level;
    }

    private static log(p_level: LOG_LEVEL, p_message: string, p_depth: number): void {
        if (p_level < this.m_log_level) {
            return;
        }

        const stack = new Error().stack?.split('\n')[p_depth] ?? '';
        const match = stack.match(/\((.*):(\d+):(\d+)\)$/);
        const file = match?.[1]?.split(/[\\/]/).pop() ?? 'unknown';
        const line = match?.[2] ?? '0';

        console.log(
            `[${new Date().toISOString()}] [${LOG_LEVEL[p_level]}] [${file}:${line}] ${p_message}`
        );
    }

    public static logTrace(p_message: string, p_depth: number = 3) {
        this.log(LOG_LEVEL.TRACE, p_message, p_depth);
    }

    public static logDebug(p_message: string, p_depth: number = 3) {
        this.log(LOG_LEVEL.DEBUG, p_message, p_depth);
    }

    public static logInfo(p_message: string, p_depth: number = 3) {
        this.log(LOG_LEVEL.INFO, p_message, p_depth);
    }

    public static logWarn(p_message: string, p_depth: number = 3) {
        this.log(LOG_LEVEL.WARN, p_message, p_depth);
    }

    public static logError(p_message: string, p_depth: number = 3) {
        this.log(LOG_LEVEL.ERROR, p_message, p_depth);
    }
}
