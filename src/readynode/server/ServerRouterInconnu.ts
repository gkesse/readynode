import ServerResponseData from './ServerResponseData';

export default class ServerRouterInconnu {
    public static async onGet(p_res: ServerResponseData): Promise<void> {
        p_res.getResponseData().setJson(
            404,
            JSON.stringify({
                status: 'error',
                message: 'La ressource demandee est introuvable.'
            })
        );
    }

    public static async onPost(p_res: ServerResponseData): Promise<void> {
        p_res.getResponseData().setJson(
            404,
            JSON.stringify({
                status: 'error',
                message: 'La ressource demandee est introuvable.'
            })
        );
    }

    public static async onUnknown(p_res: ServerResponseData): Promise<void> {
        p_res.getResponseData().setJson(
            404,
            JSON.stringify({
                status: 'error',
                message: 'La ressource demandee est introuvable.'
            })
        );
    }

    public static async onException(p_res: ServerResponseData): Promise<void> {
        p_res.getResponseData().setJson(
            404,
            JSON.stringify({
                status: 'error',
                message: 'La ressource demandee est introuvable.'
            })
        );
    }

    public static async onError(p_res: ServerResponseData): Promise<void> {
        p_res.getResponseData().setJson(
            404,
            JSON.stringify({
                status: 'error',
                message: 'La ressource demandee est introuvable.'
            })
        );
    }
}
