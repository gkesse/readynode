import ServerResponseData from '@readynode/server/ServerResponseData';
import ServerTemplateWeb from '@readynode/server/ServerTemplateWeb';
import HomeController from '../controller/readydev/home/HomeController';

export default class RouterFacadeReadydev {
    public static async onCallback(p_res: ServerResponseData): Promise<void> {
        const template = new ServerTemplateWeb(p_res.getResourcePath().getUrlHome(), {
            home: new HomeController(p_res)
        });
        await template.loadHtml();
        p_res.getResponseData().setHtml(200, template.getHtml());
    }
}
