import { Ref } from '@readynode/common/type/common';
import { Exception } from '@readynode/exception/Exception';
import Logger from '@readynode/logger/Logger';
import { Tools } from '@readynode/tools/Tools';
import { createServer, Server as HttpServer, IncomingMessage, ServerResponse } from 'http';
import ResourceLoader from './ResourceLoader';
import ResourcePath from './ResourcePath';
import ServerResponseData from './ServerResponseData';
import { RouterFacade, RouterFacadeFactory, RouterOnCallback } from './ServerRouterFactory';
import ServerRouterInconnu from './ServerRouterInconnu';

export class ServerManager {
    private readonly m_req: IncomingMessage;
    private readonly m_res: ServerResponse;

    constructor(p_req: IncomingMessage, p_res: ServerResponse) {
        this.m_req = p_req;
        this.m_res = p_res;
    }

    public async run(): Promise<void> {
        const method = this.m_req.method ?? '';
        const host = this.m_req.headers?.host ?? '';
        const url = this.m_req.url?.split('?')[0] ?? '';
        const resource_path: ResourcePath = new ResourcePath(method, host, url);
        const router_facade_factory = new RouterFacadeFactory(resource_path);
        const router_facade: RouterFacade = router_facade_factory.getRouterFacade();
        const onCallback: RouterOnCallback = router_facade.onCallback();
        const server_response_data: ServerResponseData = new ServerResponseData(resource_path);

        await onCallback(server_response_data);

        const response_data = server_response_data.getResponseData();

        this.m_res.writeHead(response_data.getStatusCode(), {
            'Content-Type': response_data.getContentType()
        });
        this.m_res.end(response_data.getResponseText());

        Logger.logInfo(
            `La page a ete chargee avec succes.|code=${resource_path.getCode()}|page=${resource_path.getPath()}`
        );
    }
}

export default class ServerController {
    private readonly m_args: string[] = [];
    private readonly m_port: Ref<number> = { value: -1 };
    private readonly m_server: HttpServer;

    constructor(p_args: string[]) {
        this.m_args = p_args;
        if (!this.loadPort(this.m_port)) {
            throw new Exception('Le numero de port est introuvable.');
        }
        this.m_server = createServer(
            async (p_req: IncomingMessage, p_res: ServerResponse): Promise<void> => {
                await this.onCallback(p_req, p_res);
            }
        );
    }

    private loadPort(p_port: Ref<number>): boolean {
        if (this.m_args.length <= 0) {
            Logger.logError("Le nombre d'arguments est incorrect.");
            return false;
        }
        const port = this.m_args[0];
        if (port.length == 0) {
            Logger.logError('Le numero de port est vide.');
            return false;
        }
        if (port.length > 5) {
            Logger.logError('La taille du numero de port est incorrect.');
            return false;
        }
        if (!Tools.isNumber(port)) {
            Logger.logError("Le numero de port n'est pas un entier.");
            return false;
        }
        p_port.value = Number(port);
        if (p_port.value < 0 || p_port.value > 65535) {
            Logger.logError('Le numero de port est invalide.');
            return false;
        }
        return true;
    }

    private async onCallback(p_req: IncomingMessage, p_res: ServerResponse): Promise<void> {
        let onCallback: RouterOnCallback = ServerRouterInconnu.onUnknown;

        try {
            const server_manager = new ServerManager(p_req, p_res);
            await server_manager.run();
        } catch {
            try {
                const path = p_req.url?.split('?')[0] ?? '';
                const resource_loader = new ResourceLoader(path);
                p_res.writeHead(200, {
                    'Content-Type': resource_loader.getContentType(),
                    'Content-Length': resource_loader.getContentLength()
                });
                p_res.end(resource_loader.getData());
            } catch (p_error_resource) {
                if (p_error_resource instanceof Exception) {
                    onCallback = ServerRouterInconnu.onException;
                } else if (p_error_resource instanceof Error) {
                    onCallback = ServerRouterInconnu.onError;
                }

                const server_response: ServerResponseData = new ServerResponseData();

                onCallback(server_response);

                const response_data = server_response.getResponseData();

                p_res.writeHead(response_data.getStatusCode(), {
                    'Content-Type': response_data.getContentType()
                });
                p_res.end(response_data.getResponseText());
            }
        }
    }

    public start(): void {
        this.m_server.listen(this.m_port.value, () => {
            Logger.logInfo(`Le serveur a demarre sur le port ${this.m_port.value}.`);
        });
    }

    public stop(): void {
        this.m_server.close(() => {
            Logger.logInfo(`Le serveur s'est arrete sur le port ${this.m_port.value}.`);
        });
    }
}
