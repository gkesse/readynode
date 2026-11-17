import Logger from '@readynode/logger/Logger';

describe('TestLogger', () => {
    it('Test_Log_Trace', () => {
        const DEF_MSG_LOG = 'Ceci est un message de trace.';

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        Logger.logTrace('Ceci est un message de trace.');

        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_LOG));
        logSpy.mockRestore();
    });

    it('Test_Log_Debug', () => {
        const DEF_MSG_LOG = 'Ceci est un message de debug.';

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        Logger.logDebug('Ceci est un message de debug.');

        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_LOG));
        logSpy.mockRestore();
    });

    it('Test_Log_Info', () => {
        const DEF_MSG_LOG = "Ceci est un message d'information.";

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        Logger.logInfo("Ceci est un message d'information.");

        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_LOG));
        logSpy.mockRestore();
    });

    it('Test_Log_Warn', () => {
        const DEF_MSG_LOG = "Ceci est un message d'avertissement.";

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        Logger.logWarn("Ceci est un message d'avertissement.");

        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_LOG));
        logSpy.mockRestore();
    });

    it('Test_Log_Error', () => {
        const DEF_MSG_LOG = "Ceci est un message d'erreur.";

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        Logger.logError("Ceci est un message d'erreur.");

        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_LOG));
        logSpy.mockRestore();
    });
});
