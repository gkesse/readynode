import { Ref } from '@readynode/common/type/common';
import { Exception } from '@readynode/exception/Exception';
import ServerModule from '@readynode/server/ServerModule';

export enum MODULE_TYPE {
    INCONNU,
    SERVER
}

export interface ModuleInterface {
    run(): void;
}

export class ModuleInconnu implements ModuleInterface {
    public run(): void {}
}

export type ModuleOnCreate = () => ModuleInterface;

export class Module {
    private readonly m_type: MODULE_TYPE;
    private readonly m_name: string;
    private readonly m_on_create: ModuleOnCreate;

    constructor();
    constructor(p_type: MODULE_TYPE, p_name: string, p_on_create: ModuleOnCreate);

    constructor(p_type?: MODULE_TYPE, p_name?: string, p_on_create?: ModuleOnCreate) {
        this.m_type = p_type ?? MODULE_TYPE.INCONNU;
        this.m_name = p_name ?? 'inconnu';
        this.m_on_create = p_on_create ?? (() => new ModuleInconnu());
    }

    public getType(): MODULE_TYPE {
        return this.m_type;
    }

    public getName(): string {
        return this.m_name;
    }

    public onCreate(): ModuleOnCreate {
        return this.m_on_create;
    }
}

export class ModuleList extends Array<Module> {
    public loadModuleByName(p_module: Ref<Module>, p_name: string): boolean {
        const module = this.find((p_obj) => p_obj.getName() === p_name);
        if (module) {
            p_module.value = module;
            return true;
        }
        return false;
    }
}

export default class ModuleFactory {
    private readonly m_module_list: ModuleList = new ModuleList();
    private readonly m_module: Ref<Module> = { value: new Module() };
    private readonly m_name: string = '';
    private readonly m_args: string[] = [];

    constructor();
    constructor(p_name: string, p_args: string[]);

    constructor(p_name?: string, p_args?: string[]) {
        if (p_name === undefined) {
            return;
        }

        this.m_name = p_name ?? '';
        this.m_args = p_args ?? [];
        this.initModuleList();
        if (!this.loadModule(this.m_module)) {
            throw new Exception('Le module est introuvable.');
        }
    }

    private initModuleList(): void {
        this.addModule(MODULE_TYPE.SERVER, 'server', () => new ServerModule(this.m_args));
    }

    private addModule(p_type: MODULE_TYPE, p_name: string, p_on_create: ModuleOnCreate): void {
        const module = new Module(p_type, p_name, p_on_create);
        this.m_module_list.push(module);
    }

    private loadModule(p_module: Ref<Module>): boolean {
        return this.m_module_list.loadModuleByName(p_module, this.m_name);
    }

    public getModule(): Module {
        return this.m_module.value;
    }
}
