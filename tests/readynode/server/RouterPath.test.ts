import ServerResponseData from '@readynode/server/ServerResponseData';
import { RouterPath } from '@readynode/server/ServerRouterFactory';

describe('TestServerRouterPath', () => {
    it('Test_Router_Path_Par_Defaut', async () => {
        const router = new RouterPath();
        expect(router.getMethod()).toBe('');
        expect(router.getPath()).toBe('');
        expect(await router.onCallback()(new ServerResponseData())).toBeUndefined();
    });

    it('Test_Appel_Callback', async () => {
        const onCallback = async (_p_args: ServerResponseData) => {
            console.log('Ceci est un message de test.');
        };
        const router = new RouterPath('METHOD_ROUTER', 'PATH_ROUTER', onCallback);
        expect(router.getMethod()).toBe('METHOD_ROUTER');
        expect(router.getPath()).toBe('PATH_ROUTER');

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        await router.onCallback()(new ServerResponseData());
        expect(logSpy).toHaveBeenCalledWith('Ceci est un message de test.');
        logSpy.mockRestore();
    });
});
