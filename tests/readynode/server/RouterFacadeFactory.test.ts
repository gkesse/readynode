import ResourcePath from '@readynode/server/ResourcePath';
import {
    ROUTER_FACADE_TYPE,
    RouterFacadeFactory,
    RouterFacadeInconnu
} from '@readynode/server/ServerRouterFactory';
import RouterFacadeReadydev from '@readynode/server/web/router/RouterFacadeReadydev';

describe('TestRouterFacadeFactory', () => {
    it('Test_Resource_Facade_Factory_Par_Defaut', () => {
        const router_facade_factory = new RouterFacadeFactory();
        const router_facade = router_facade_factory.getRouterFacade();
        expect(router_facade.getType()).toBe(ROUTER_FACADE_TYPE.INCONNU);
        expect(router_facade.getCode()).toBe('inconnu');
        expect(router_facade.getFacade()).toBeInstanceOf(RouterFacadeInconnu);
    });

    it('Test_Resource_Path_Par_Defaut', () => {
        const resource_path = new ResourcePath();
        const router_facade_factory = new RouterFacadeFactory(resource_path);
        const router_facade = router_facade_factory.getRouterFacade();
        expect(router_facade.getType()).toBe(ROUTER_FACADE_TYPE.READYDEV);
        expect(router_facade.getCode()).toBe('readydev');
        expect(router_facade.getFacade()).toBeInstanceOf(RouterFacadeReadydev);
    });

    it('Test_Router_Chemin_Introuvable', () => {
        const DEF_MSG_EXCEPTION = 'Le chemin du routeur est introuvable.';

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

    it('Test_Router_Facade_Readydev', () => {
        const resource_path = new ResourcePath('GET', 'localhost', '/readydev/home');
        const router_facade_factory = new RouterFacadeFactory(resource_path);
        const router_facade = router_facade_factory.getRouterFacade();
        expect(router_facade.getType()).toBe(ROUTER_FACADE_TYPE.READYDEV);
        expect(router_facade.getCode()).toBe('readydev');
        expect(router_facade.getFacade()).toBeInstanceOf(RouterFacadeReadydev);
    });
});
