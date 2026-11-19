import ServerResponseData from '@readynode/server/ServerResponseData';
import RouterFacadeReadydev from '@readynode/server/web/router/RouterFacadeReadydev';

describe('TestServerRouterFacadeReadydev', () => {
    it('Test_Router_Facade_Readydev_Par_Defaut', async () => {
        const router_facade = new RouterFacadeReadydev();
        const router_path = router_facade.getRouterPath();
        expect(router_path.getMethod()).toBe('GET');
        expect(router_path.getPath()).toBe('home');
        expect(await router_path.onCallback()(new ServerResponseData())).toBeUndefined();
    });
});
