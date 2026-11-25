import ServerResponseData from '@readynode/server/ServerResponseData';
import ServerTemplateWeb from '@readynode/server/ServerTemplateWeb';
import RouterFacadeReadydev from '@readynode/server/web/router/RouterFacadeReadydev';

describe('TestServerRouterFacadeReadydev', () => {
    it('Test_Facade_On_Callback', async () => {
        const setHtml = jest.fn();

        const responseData = {
            setHtml
        };

        const p_res = {
            getResourcePath: () => ({
                getUrlHome: () => '/readydev/home'
            }),
            getResponseData: () => responseData
        } as unknown as ServerResponseData;

        jest.spyOn(ServerTemplateWeb.prototype, 'loadHtml').mockResolvedValue();
        jest.spyOn(ServerTemplateWeb.prototype, 'getHtml').mockReturnValue(
            '<p>Ceci est un message de test.</p>'
        );

        await RouterFacadeReadydev.onCallback(p_res);

        expect(setHtml).toHaveBeenCalledWith(200, '<p>Ceci est un message de test.</p>');
    });
});
