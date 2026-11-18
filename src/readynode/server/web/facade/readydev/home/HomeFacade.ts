import ServerResponseData from '@readynode/server/ServerResponseData';
import ServerTemplateWeb from '@readynode/server/ServerTemplateWeb';
import HomeController from '@readynode/server/web/controller/readydev/home/HomeController';

export default class HomeFacade {
    public static async onHome(p_res: ServerResponseData): Promise<void> {
        const template = new ServerTemplateWeb(p_res.getResourcePath().getUrlPath(), {
            home: new HomeController(p_res)
        });
        await template.loadHtml();
        p_res.getResponseData().setHtml(200, template.getHtml());
    }
}
