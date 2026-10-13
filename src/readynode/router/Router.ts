import { IncomingMessage, ServerResponse } from 'http';

export type RouterCallback = (p_req: IncomingMessage, p_res: ServerResponse) => void;

export default class Router {
    private readonly m_routes: Map<string, RouterCallback>;

    constructor() {
        this.m_routes = new Map<string, RouterCallback>();
    }

    public get(p_path: string, p_handler: RouterCallback): void {
        this.m_routes.set(`GET:${p_path}`, p_handler);
    }

    public onCallback(p_req: IncomingMessage, p_res: ServerResponse): void {
        const method = p_req.method ?? '';
        const path = p_req.url ?? '/';

        const on_callback = this.m_routes.get(`${method}:${path}`);

        if (on_callback) {
            on_callback(p_req, p_res);
            return;
        }

        p_res.writeHead(404, {
            'Content-Type': 'text/plain'
        });

        p_res.end('Not Found');
    }
}
