import ServerModule from '@readynode/server/ServerModule';

describe('TestServerModule', () => {
    it('Test_Server_Module_Par_Defaut', () => {
        const server_module = new ServerModule();
        expect(server_module.run()).toBeUndefined();
    });

    it('Test_Nombre_Arguments_Incorrect', () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        expect(() => {
            new ServerModule([]);
        }).toThrow("Le nombre d'arguments est incorrect.");

        expect(logSpy).toHaveBeenCalledWith(
            expect.stringContaining("Le nombre d'arguments est incorrect.")
        );
        logSpy.mockRestore();
    });
});
