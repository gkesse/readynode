import { Ref } from '@readynode/common/type/common';
import ServerResponseData from '@readynode/server/ServerResponseData';
import {
    RouterOnCallback,
    RouterPath,
    RouterPathList
} from '@readynode/server/ServerRouterFactory';

describe('TestRouterPathList', () => {
    it('Test_Router_List_Par_Defaut', () => {
        const router_list = new RouterPathList();
        expect(router_list.length).toBe(0);
    });

    it('Test_Router_Non_Trouve', async () => {
        const router_list = new RouterPathList();

        const onAddRouter = (p_method: string, p_name: string, p_on_callback: RouterOnCallback) => {
            const router = new RouterPath(p_method, p_name, p_on_callback);
            router_list.push(router);
        };

        onAddRouter('METHOD_ROUTER', 'PATH_ROUTER', async (_p_res: ServerResponseData) => {});

        expect(router_list.length).toBe(1);

        const router: Ref<RouterPath> = { value: new RouterPath() };

        expect(router_list.loadRouterByPath(router, 'METHOD_ROUTER', 'INCONNU')).toBe(false);
        expect(router_list.loadRouterByPath(router, 'INCONNU', 'PATH_ROUTER')).toBe(false);
        expect(router_list.loadRouterByPath(router, 'INCONNU', 'INCONNU')).toBe(false);

        expect(router.value.getMethod()).toBe('');
        expect(router.value.getPath()).toBe('');
        expect(await router.value.onCallback()(new ServerResponseData())).toBeUndefined();
    });

    it('Test_Router_Trouve', async () => {
        const router_list = new RouterPathList();

        const onAddRouter = (p_method: string, p_name: string, p_on_callback: RouterOnCallback) => {
            const router = new RouterPath(p_method, p_name, p_on_callback);
            router_list.push(router);
        };

        onAddRouter('METHOD_ROUTER', 'PATH_ROUTER', async (_p_res: ServerResponseData) => {});

        expect(router_list.length).toBe(1);

        const router: Ref<RouterPath> = { value: new RouterPath() };

        expect(router_list.loadRouterByPath(router, 'METHOD_ROUTER', 'PATH_ROUTER')).toBe(true);

        expect(router.value.getMethod()).toBe('METHOD_ROUTER');
        expect(router.value.getPath()).toBe('PATH_ROUTER');
        expect(await router.value.onCallback()(new ServerResponseData())).toBeUndefined();
    });
});
