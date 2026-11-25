import ResourcePath from '@readynode/server/ResourcePath';
import ServerResponseData from '@readynode/server/ServerResponseData';
import { ROUTER_FACADE_TYPE, RouterFacadeFactory } from '@readynode/server/ServerRouterFactory';

describe('TestServerRouterFacadeFactory', () => {
    it('Test_Resource_Facade_Factory_Par_Defaut', async () => {
        const router_facade_factory = new RouterFacadeFactory();
        const router_facade = router_facade_factory.getRouterFacade();
        expect(router_facade.getType()).toBe(ROUTER_FACADE_TYPE.INCONNU);
        expect(router_facade.getCode()).toBe('inconnu');
        expect(await router_facade.onCallback()(new ServerResponseData())).toBeUndefined();
    });

    it('Test_Resource_Path_Par_Defaut', async () => {
        const resource_path = new ResourcePath();
        const router_facade_factory = new RouterFacadeFactory(resource_path);
        const router_facade = router_facade_factory.getRouterFacade();
        expect(router_facade.getType()).toBe(ROUTER_FACADE_TYPE.READYDEV);
        expect(router_facade.getCode()).toBe('readydev');
        expect(await router_facade.onCallback()(new ServerResponseData())).toBeUndefined();
    });

    it('Test_Erreur_Router_Chemin_Introuvable', () => {
        const DEF_MSG_EXCEPTION = 'La facade du router est introuvable.';

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        expect(() => {
            const resource_path = new ResourcePath(
                'METHOD_RESOURCE',
                'HOST_RESOURCE',
                'URL_RESOURCE'
            );
            new RouterFacadeFactory(resource_path);
        }).toThrow(DEF_MSG_EXCEPTION);

        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_EXCEPTION));
        logSpy.mockRestore();
    });

    it('Test_Router_Facade_Readydev', async () => {
        const resource_path = new ResourcePath('GET', 'localhost', '/readydev/home');
        const router_facade_factory = new RouterFacadeFactory(resource_path);
        const router_facade = router_facade_factory.getRouterFacade();
        expect(router_facade.getType()).toBe(ROUTER_FACADE_TYPE.READYDEV);
        expect(router_facade.getCode()).toBe('readydev');
        expect(await router_facade.onCallback()(new ServerResponseData())).toBeUndefined();
    });
});
