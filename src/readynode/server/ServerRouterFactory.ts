import { Ref } from '@readynode/common/type/common';
import { Exception } from '@readynode/exception/Exception';
import ResourcePath from './ResourcePath';
import ServerResponseData from './ServerResponseData';
import RouterFacadeReadydev from './web/router/RouterFacadeReadydev';

export enum ROUTER_FACADE_TYPE {
    INCONNU,
    READYDEV
}

export interface RouterFacadeInterface {
    getRouterPath(): RouterPath;
}

export class RouterFacadeInconnu implements RouterFacadeInterface {
    public getRouterPath(): RouterPath {
        return new RouterPath();
    }
}

export class RouterFacade {
    private readonly m_type: ROUTER_FACADE_TYPE;
    private readonly m_code: string;
    private readonly m_facade: RouterFacadeInterface = new RouterFacadeInconnu();

    constructor();
    constructor(p_type: ROUTER_FACADE_TYPE, p_code: string, p_facade: RouterFacadeInterface);

    constructor(p_type?: ROUTER_FACADE_TYPE, p_code?: string, p_facade?: RouterFacadeInterface) {
        this.m_type = p_type ?? ROUTER_FACADE_TYPE.INCONNU;
        this.m_code = p_code ?? 'inconnu';
        this.m_facade = p_facade ?? new RouterFacadeInconnu();
    }

    public getType(): ROUTER_FACADE_TYPE {
        return this.m_type;
    }

    public getCode(): string {
        return this.m_code;
    }

    public getFacade(): RouterFacadeInterface {
        return this.m_facade;
    }
}

export class RouterFacadeList extends Array<RouterFacade> {
    public loadRouterFacade(p_router_facade: Ref<RouterFacade>, p_name: string): boolean {
        const router_facade = this.find((p_obj) => p_obj.getCode() === p_name);
        if (router_facade) {
            p_router_facade.value = router_facade;
            return true;
        }
        return false;
    }
}

export class RouterFacadeFactory {
    private readonly m_router_facade_list: RouterFacadeList = new RouterFacadeList();
    private readonly m_router_facade: Ref<RouterFacade> = { value: new RouterFacade() };
    private readonly m_resource_path: ResourcePath = new ResourcePath();

    constructor();
    constructor(p_resource_path: ResourcePath);

    constructor(p_resource_path?: ResourcePath) {
        if (p_resource_path === undefined) {
            return;
        }
        this.m_resource_path = p_resource_path ?? new ResourcePath();
        this.initRouterFacadeList();
        if (!this.loadRouterFacade(this.m_router_facade)) {
            throw new Exception(
                `La facade du router est introuvable.|url=${this.m_resource_path.getUrl()}`,
                false
            );
        }
    }

    private addRouterFacade(
        p_type: ROUTER_FACADE_TYPE,
        p_site_code: string,
        p_facade: RouterFacadeInterface
    ): void {
        const router_facade = new RouterFacade(p_type, p_site_code, p_facade);
        this.m_router_facade_list.push(router_facade);
    }

    private initRouterFacadeList(): void {
        this.addRouterFacade(
            ROUTER_FACADE_TYPE.READYDEV,
            'readydev',
            new RouterFacadeReadydev(this.m_resource_path)
        );
    }

    private loadRouterFacade(p_router_facade: Ref<RouterFacade>): boolean {
        return this.m_router_facade_list.loadRouterFacade(
            p_router_facade,
            this.m_resource_path.getCode()
        );
    }

    public getRouterFacade(): RouterFacade {
        return this.m_router_facade.value;
    }
}

export type RouterOnCallback = (p_res: ServerResponseData) => Promise<void>;

export class RouterPath {
    private readonly m_method: string;
    private readonly m_path: string;
    private readonly m_on_callback: RouterOnCallback;

    constructor();
    constructor(p_method: string, p_path: string, p_on_callback: RouterOnCallback);

    constructor(p_method?: string, p_path?: string, p_on_callback?: RouterOnCallback) {
        this.m_method = p_method ?? '';
        this.m_path = p_path ?? '';
        this.m_on_callback = p_on_callback ?? (async (_p_res: ServerResponseData) => {});
    }

    public getMethod(): string {
        return this.m_method;
    }

    public getPath(): string {
        return this.m_path;
    }

    public onCallback(): RouterOnCallback {
        return this.m_on_callback;
    }
}

export class RouterPathList extends Array<RouterPath> {
    public loadRouterByPath(p_router: Ref<RouterPath>, p_method: string, p_path: string): boolean {
        const router = this.find(
            (p_obj) => p_obj.getMethod() === p_method && p_obj.getPath() === p_path
        );
        if (router) {
            p_router.value = router;
            return true;
        }
        return false;
    }

    private addRouter(p_method: string, p_path: string, p_callback: RouterOnCallback): void {
        const router = new RouterPath(p_method, p_path, p_callback);
        this.push(router);
    }

    public addRouterGet(p_path: string, p_callback: RouterOnCallback): void {
        this.addRouter('GET', p_path, p_callback);
    }
}
