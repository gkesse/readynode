import { Exception } from '@readynode/exception/Exception';

export default class ResourcePath {
    private readonly m_method: string = 'GET';
    private readonly m_host: string = '';
    private readonly m_url: string = '';
    private m_code: string = 'readydev';
    private m_path: string = 'home';

    constructor();
    constructor(p_method: string, p_host: string, p_url: string);

    constructor(p_method?: string, p_host?: string, p_url?: string) {
        if (p_method === undefined) {
            return;
        }
        if (p_method === '') {
            throw new Exception('La methode de la ressource est vide.');
        }
        if (p_host === '') {
            throw new Exception('Le nom du serveur de la ressource est vide.');
        }
        this.m_method = p_method ?? 'GET';
        this.m_host = p_host ?? '';
        this.m_url = p_url ?? '';
        this.loadResource();
    }

    private loadResource() {
        if (this.m_url !== '') {
            const normalized = this.m_url.replace(/^\/|\/$/g, '');
            const [code, ...path] = normalized.split('/');

            if (code !== '') {
                this.m_code = code;
            }

            if (path.length !== 0) {
                this.m_path = path.join('/');
            }
        }
    }

    public getMethod(): string {
        return this.m_method;
    }

    public getCode(): string {
        return this.m_code;
    }

    public getPath(): string {
        return this.m_path;
    }

    public getHost() {
        return this.m_host;
    }

    public getUrl() {
        return this.m_url;
    }

    public getUrlNormalize() {
        if (this.m_url === '') return '';
        return this.m_url.startsWith('/') ? this.m_url : `/${this.m_url}`;
    }

    public getUrlPath() {
        return [this.m_code, this.m_path].join('/');
    }
}
