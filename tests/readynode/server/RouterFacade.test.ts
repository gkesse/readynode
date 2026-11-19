import {
    ROUTER_FACADE_TYPE,
    RouterFacade,
    RouterFacadeInconnu
} from '@readynode/server/ServerRouterFactory';
import RouterFacadeReadydev from '@readynode/server/web/router/RouterFacadeReadydev';

describe('TestServerRouterFacade', () => {
    it('Test_Resource_Facade_Par_Defaut', () => {
        const router_facade = new RouterFacade();
        expect(router_facade.getType()).toBe(ROUTER_FACADE_TYPE.INCONNU);
        expect(router_facade.getCode()).toBe('inconnu');
        expect(router_facade.getFacade()).toBeInstanceOf(RouterFacadeInconnu);
    });

    it('Test_Resource_Facade_Readydev', () => {
        const router_facade = new RouterFacade(
            ROUTER_FACADE_TYPE.READYDEV,
            'readydev',
            new RouterFacadeReadydev()
        );
        expect(router_facade.getType()).toBe(ROUTER_FACADE_TYPE.READYDEV);
        expect(router_facade.getCode()).toBe('readydev');
        expect(router_facade.getFacade()).toBeInstanceOf(RouterFacadeReadydev);
    });
});
