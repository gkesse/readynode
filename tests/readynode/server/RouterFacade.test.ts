import ServerResponseData from '@readynode/server/ServerResponseData';
import { ROUTER_FACADE_TYPE, RouterFacade } from '@readynode/server/ServerRouterFactory';

describe('TestServerRouterFacade', () => {
    it('Test_Resource_Facade_Par_Defaut', async () => {
        const router_facade = new RouterFacade();
        expect(router_facade.getType()).toBe(ROUTER_FACADE_TYPE.INCONNU);
        expect(router_facade.getCode()).toBe('inconnu');
        expect(await router_facade.onCallback()(new ServerResponseData())).toBeUndefined();
    });

    it('Test_Resource_Facade_Readydev', async () => {
        const onCallback = async (_p_res: ServerResponseData) => {
            console.log('Ceci est un message de test.');
        };

        const router_facade = new RouterFacade(ROUTER_FACADE_TYPE.READYDEV, 'readydev', onCallback);
        expect(router_facade.getType()).toBe(ROUTER_FACADE_TYPE.READYDEV);
        expect(router_facade.getCode()).toBe('readydev');

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        await router_facade.onCallback()(new ServerResponseData());
        expect(logSpy).toHaveBeenCalledWith('Ceci est un message de test.');
        logSpy.mockRestore();
    });
});
