import ServerResponseData from '@readynode/server/ServerResponseData';
import ServerTemplateWeb from '@readynode/server/ServerTemplateWeb';
import HomeFacade from '@readynode/server/web/facade/readydev/home/HomeFacade';

describe('TestHomeFacade', () => {
    it('Test_Facade_On_Home', async () => {
        const setHtml = jest.fn();

        const responseData = {
            setHtml
        };

        const p_res = {
            getResourcePath: () => ({
                getUrlPath: () => '/readydev/home'
            }),
            getResponseData: () => responseData
        } as unknown as ServerResponseData;

        jest.spyOn(ServerTemplateWeb.prototype, 'loadHtml').mockResolvedValue();
        jest.spyOn(ServerTemplateWeb.prototype, 'getHtml').mockReturnValue(
            '<p>Ceci est un message de test.</p>'
        );

        await HomeFacade.onHome(p_res);

        expect(setHtml).toHaveBeenCalledWith(200, '<p>Ceci est un message de test.</p>');
    });
});
