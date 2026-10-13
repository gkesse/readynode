import { createServer, IncomingMessage, ServerResponse, Server as HttpServer } from 'http';
import Router from '../router/Router';

export default class Server {
    private readonly m_port: number;
    private readonly m_server: HttpServer;
    private readonly m_router: Router;

    constructor(p_port: number = 3000, p_router: Router) {
        this.m_port = p_port;
        this.m_router = p_router;

        this.m_server = createServer((p_req: IncomingMessage, p_res: ServerResponse): void => {
            this.onCallback(p_req, p_res);
        });
    }

    private onCallback(p_req: IncomingMessage, p_res: ServerResponse): void {
        this.m_router.onCallback(p_req, p_res);
    }

    public start(): void {
        this.m_server.listen(this.m_port, () => {
            console.log(`Demarrage du serveur sur le port ${this.m_port}`);
        });
    }

    public stop(): void {
        this.m_server.close(() => {
            console.log('Arret du serveur');
        });
    }
}
