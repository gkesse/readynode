import ServerController from '@readynode/server/ServerController';
import { createServer } from 'http';

jest.mock('http');

describe('TestServerController', () => {
    it('Test_Nombre_Arguments_Incorrect', () => {
        const DEF_MSG_ERREUR = "Le nombre d'arguments est incorrect.";
        const DEF_MSG_EXCEPTION = 'Le numero de port est introuvable.';

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        expect(() => {
            new ServerController([]);
        }).toThrow(DEF_MSG_EXCEPTION);

        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_ERREUR));
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_EXCEPTION));
        logSpy.mockRestore();
    });

    it('Test_Numero_Port_Vide', () => {
        const DEF_MSG_ERREUR = 'Le numero de port est vide.';
        const DEF_MSG_EXCEPTION = 'Le numero de port est introuvable.';

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        expect(() => {
            new ServerController(['']);
        }).toThrow(DEF_MSG_EXCEPTION);

        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_ERREUR));
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_EXCEPTION));
        logSpy.mockRestore();
    });

    it('Test_Taille_Numero_Port_Incorrect', () => {
        const DEF_MSG_ERREUR = 'La taille du numero de port est incorrect.';
        const DEF_MSG_EXCEPTION = 'Le numero de port est introuvable.';

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        expect(() => {
            new ServerController(['NUMERO_PORT']);
        }).toThrow(DEF_MSG_EXCEPTION);

        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_ERREUR));
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_EXCEPTION));
        logSpy.mockRestore();
    });

    it('Test_Numero_Port_Non_Entier', () => {
        const DEF_MSG_ERREUR = "Le numero de port n'est pas un entier.";
        const DEF_MSG_EXCEPTION = 'Le numero de port est introuvable.';

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        expect(() => {
            new ServerController(['PORT']);
        }).toThrow(DEF_MSG_EXCEPTION);

        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_ERREUR));
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_EXCEPTION));
        logSpy.mockRestore();
    });

    it('Test_Numero_Port_Invalide', () => {
        const DEF_MSG_ERREUR = 'Le numero de port est invalide.';
        const DEF_MSG_EXCEPTION = 'Le numero de port est introuvable.';

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        expect(() => {
            new ServerController(['99999']);
        }).toThrow(DEF_MSG_EXCEPTION);

        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_ERREUR));
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_EXCEPTION));
        logSpy.mockRestore();
    });

    it('Test_Server_Demarrage', () => {
        const listenMock = jest.fn();
        const closeMock = jest.fn();

        (createServer as jest.Mock).mockReturnValue({
            listen: listenMock,
            close: closeMock
        });

        const server_controller = new ServerController(['8080']);
        server_controller.start();

        expect(listenMock).toHaveBeenCalledWith(8080, expect.any(Function));
    });

    it('Test_Server_Arret', () => {
        const listenMock = jest.fn();
        const closeMock = jest.fn();

        (createServer as jest.Mock).mockReturnValue({
            listen: listenMock,
            close: closeMock
        });

        const controller = new ServerController(['8080']);
        controller.stop();

        expect(closeMock).toHaveBeenCalledWith(expect.any(Function));
    });
});
