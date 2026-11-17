import ResourcePath from './ResourcePath';

export class ResponseData {
    private m_status_code: number = 0;
    private m_content_type: string = '';
    private m_response_text: string = '';

    constructor() {
        this.setJson(
            404,
            JSON.stringify({
                status: 'error',
                message: 'La ressource est introuvable.'
            })
        );
    }

    public setHtml(p_status_code: number, p_response_text: string) {
        this.m_status_code = p_status_code;
        this.m_content_type = 'text/html; charset=utf-8';
        this.m_response_text = p_response_text;
    }

    public setJson(p_status_code: number, p_response_text: string) {
        this.m_status_code = p_status_code;
        this.m_content_type = 'application/json; charset=utf-8';
        this.m_response_text = p_response_text;
    }

    public getStatusCode(): number {
        return this.m_status_code;
    }

    public getContentType(): string {
        return this.m_content_type;
    }

    public getResponseText(): string {
        return this.m_response_text;
    }
}

export default class ServerResponseData {
    private readonly m_response_data: ResponseData = new ResponseData();
    private readonly m_resource_path: ResourcePath = new ResourcePath();

    constructor();
    constructor(p_resource_path: ResourcePath);

    constructor(p_resource_path?: ResourcePath) {
        if (p_resource_path === undefined) {
            return;
        }
        this.m_resource_path = p_resource_path ?? new ResourcePath();
    }

    public getResponseData() {
        return this.m_response_data;
    }

    public getResourcePath() {
        return this.m_resource_path;
    }
}
