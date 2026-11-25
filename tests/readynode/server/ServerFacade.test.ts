import ServerFacade from '@readynode/server/ServerFacade';
import { createServer } from 'http';

jest.mock('http');

describe('TestServerFacade', () => {
    it('Test_Erreur_Nombre_Arguments_Incorrect', () => {
        const DEF_MSG_ERREUR = "Le nombre d'arguments est incorrect.";
        const DEF_MSG_EXCEPTION = 'Le numero de port est introuvable.';

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        expect(() => {
            ServerFacade.onRunServer([]);
        }).toThrow(DEF_MSG_EXCEPTION);

        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_ERREUR));
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_EXCEPTION));
        logSpy.mockRestore();
    });

    it('Test_Erreur_Numero_Port_Vide', () => {
        const DEF_MSG_ERREUR = 'Le numero de port est vide.';
        const DEF_MSG_EXCEPTION = 'Le numero de port est introuvable.';

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        expect(() => {
            ServerFacade.onRunServer(['']);
        }).toThrow(DEF_MSG_EXCEPTION);

        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_ERREUR));
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_EXCEPTION));
        logSpy.mockRestore();
    });

    it('Test_Erreur_Numero_Port_Taille_Incorrecte', () => {
        const DEF_MSG_ERREUR = 'La taille du numero de port est incorrect.';
        const DEF_MSG_EXCEPTION = 'Le numero de port est introuvable.';

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        expect(() => {
            ServerFacade.onRunServer(['NUM_PORT']);
        }).toThrow(DEF_MSG_EXCEPTION);

        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_ERREUR));
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_EXCEPTION));
        logSpy.mockRestore();
    });

    it('Test_Erreur_Numero_Port_Non_Entier', () => {
        const DEF_MSG_ERREUR = "Le numero de port n'est pas un entier.";
        const DEF_MSG_EXCEPTION = 'Le numero de port est introuvable.';

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        expect(() => {
            ServerFacade.onRunServer(['PORT']);
        }).toThrow(DEF_MSG_EXCEPTION);

        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_ERREUR));
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_EXCEPTION));
        logSpy.mockRestore();
    });

    it('Test_Erreur_Numero_Port_Invalide', () => {
        const DEF_MSG_ERREUR = 'Le numero de port est invalide.';
        const DEF_MSG_EXCEPTION = 'Le numero de port est introuvable.';

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        expect(() => {
            ServerFacade.onRunServer(['99999']);
        }).toThrow(DEF_MSG_EXCEPTION);

        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_ERREUR));
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_EXCEPTION));
        logSpy.mockRestore();
    });

    it('Test_Numero_Port_Correct', () => {
        const listenMock = jest.fn();
        const closeMock = jest.fn();

        (createServer as jest.Mock).mockReturnValue({
            listen: listenMock,
            close: closeMock
        });

        ServerFacade.onRunServer(['8080']);

        expect(listenMock).toHaveBeenCalledWith(8080, expect.any(Function));
    });
});
