import { IncomingMessage, ServerResponse } from 'http';

export default class ServerMessage {
    private readonly m_req: IncomingMessage;
    private readonly m_res: ServerResponse;

    constructor(p_req: IncomingMessage, p_res: ServerResponse) {
        this.m_req = p_req;
        this.m_res = p_res;
    }

    public sendHtml(p_status: number, p_responseText: string): void {
        this.m_res.writeHead(p_status, {
            'Content-Type': 'text/html; charset=utf-8'
        });
        this.m_res.end(p_responseText);
    }

    public sendJson<T>(p_status: number, p_responseJson: T): void {
        this.m_res.writeHead(p_status, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        this.m_res.end(JSON.stringify(p_responseJson));
    }
}
