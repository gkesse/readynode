import { Ref } from '@readynode/common/type/common';
import { Exception } from '@readynode/exception/Exception';
import ResourcePath from './ResourcePath';
import ServerResponseData from './ServerResponseData';
import RouterFacadeReadydev from './web/router/RouterFacadeReadydev';

export enum ROUTER_FACADE_TYPE {
    INCONNU,
    READYDEV
}

export type RouterOnCallback = (p_res: ServerResponseData) => Promise<void>;

export class RouterFacade {
    private readonly m_type: ROUTER_FACADE_TYPE;
    private readonly m_code: string;
    private readonly m_on_callback: RouterOnCallback;

    constructor();
    constructor(p_type: ROUTER_FACADE_TYPE, p_code: string, p_on_callback: RouterOnCallback);

    constructor(p_type?: ROUTER_FACADE_TYPE, p_code?: string, p_on_callback?: RouterOnCallback) {
        this.m_type = p_type ?? ROUTER_FACADE_TYPE.INCONNU;
        this.m_code = p_code ?? 'inconnu';
        this.m_on_callback = p_on_callback ?? (async (_p_res: ServerResponseData) => {});
    }

    public getType(): ROUTER_FACADE_TYPE {
        return this.m_type;
    }

    public getCode(): string {
        return this.m_code;
    }

    public onCallback(): RouterOnCallback {
        return this.m_on_callback;
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
        p_on_facade: RouterOnCallback
    ): void {
        const router_facade = new RouterFacade(p_type, p_site_code, p_on_facade);
        this.m_router_facade_list.push(router_facade);
    }

    private initRouterFacadeList(): void {
        this.addRouterFacade(
            ROUTER_FACADE_TYPE.READYDEV,
            'readydev',
            RouterFacadeReadydev.onCallback
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
