import { Ref } from '@readynode/common/type/common';
import { Exception } from '@readynode/exception/Exception';
import ResourcePath from '@readynode/server/ResourcePath';
import {
    RouterFacadeInterface,
    RouterOnCallback,
    RouterPath,
    RouterPathList
} from '@readynode/server/ServerRouterFactory';
import HomeFacade from '../facade/readydev/home/HomeFacade';

export default class RouterFacadeReadydev implements RouterFacadeInterface {
    private readonly m_router_path_list: RouterPathList = new RouterPathList();
    private readonly m_router_path: Ref<RouterPath> = { value: new RouterPath() };
    private readonly m_resource_path: ResourcePath = new ResourcePath();

    constructor();
    constructor(p_resource_path: ResourcePath);

    constructor(p_resource_path?: ResourcePath) {
        this.m_resource_path = p_resource_path ?? new ResourcePath();
        this.initRouterPath();
        if (!this.loadRouterByPath(this.m_router_path)) {
            throw new Exception('Le chemin du routeur est introuvable.', false);
        }
    }

    private addRouterGet(p_path: string, p_callback: RouterOnCallback): void {
        this.m_router_path_list.addRouterGet(p_path, p_callback);
    }

    private initRouterGet(): void {
        this.addRouterGet('home', HomeFacade.onHome);
    }

    private initRouterPath(): void {
        this.initRouterGet();
    }

    private loadRouterByPath(p_router_path: Ref<RouterPath>): boolean {
        return this.m_router_path_list.loadRouterByPath(
            p_router_path,
            this.m_resource_path.getMethod(),
            this.m_resource_path.getPath()
        );
    }

    public getRouterPath(): RouterPath {
        return this.m_router_path.value;
    }
}
