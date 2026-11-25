import AppController from '@readynode/app/AppController';

describe('TestAppController', () => {
    it('Test_Erreur_Nombre_Arguments_Incorrect', () => {
        const DEF_MSG_EXCEPTION = "Le nombre d'arguments est incorrect.";

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        expect(() => {
            new AppController([]);
        }).toThrow(DEF_MSG_EXCEPTION);

        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_EXCEPTION));
    });

    it('Test_Erreur_Module_Introuvable', () => {
        const DEF_MSG_EXCEPTION = 'Le module est introuvable.';

        expect(() => {
            new AppController(['inconnu']);
        }).toThrow(DEF_MSG_EXCEPTION);
    });

    it('Test_Erreur_Server_Nombre_Arguments_Incorrect', () => {
        const DEF_MSG_EXCEPTION = "Le nombre d'arguments est incorrect.";

        expect(() => {
            const app_controller = new AppController(['server']);
            app_controller.run();
        }).toThrow(DEF_MSG_EXCEPTION);
    });
});
