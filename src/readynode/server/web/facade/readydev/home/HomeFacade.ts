import ServerResponseData from '@readynode/server/ServerResponseData';
import ServerTemplateWeb from '@readynode/server/ServerTemplateWeb';

export default class HomeFacade {
    public static async onHome(p_res: ServerResponseData): Promise<void> {
        const template = new ServerTemplateWeb(p_res.getResourcePath().getUrlPath(), {});
        await template.loadHtml();
        p_res.getResponseData().setHtml(200, template.getHtml());
    }
}
