import { Ref } from '@readynode/common/type/common';
import { Exception } from '@readynode/exception/Exception';
import { ModuleInterface } from '@readynode/module/ModuleFactory';
import ServerFacade from './ServerFacade';

export enum METHOD_TYPE {
    INCONNU,
    RUN_SERVER
}

export type MethodOnCallback = (p_args: string[]) => void;

export class Method {
    private readonly m_type: METHOD_TYPE = METHOD_TYPE.INCONNU;
    private readonly m_name: string = 'inconnu';
    private readonly m_on_callback: MethodOnCallback = (_p_args: string[]) => {};

    constructor();
    constructor(p_type: METHOD_TYPE, p_name: string, p_callback: MethodOnCallback);

    constructor(p_type?: METHOD_TYPE, p_name?: string, p_callback?: MethodOnCallback) {
        this.m_type = p_type ?? METHOD_TYPE.INCONNU;
        this.m_name = p_name ?? 'inconnu';
        this.m_on_callback = p_callback ?? ((_p_args: string[]) => {});
    }

    public getType(): METHOD_TYPE {
        return this.m_type;
    }

    public getName(): string {
        return this.m_name;
    }

    public onCallback(): MethodOnCallback {
        return this.m_on_callback;
    }
}

export class MethodList extends Array<Method> {
    public loadMethodByName(p_method: Ref<Method>, p_name: string): boolean {
        const method = this.find((p_obj) => p_obj.getName() === p_name);
        if (method) {
            p_method.value = method;
            return true;
        }
        return false;
    }
}

export class MethodFactory {
    private readonly m_method_list: MethodList = new MethodList();
    private readonly m_method: Ref<Method> = { value: new Method() };
    private readonly m_name: string = '';

    constructor();
    constructor(p_name: string);

    constructor(p_name?: string) {
        if (p_name === undefined) {
            return;
        }
        this.m_name = p_name ?? '';
        this.initMethodList();
        if (!this.loadMethod(this.m_method)) {
            throw new Exception('La methode est introuvable.');
        }
    }

    private addMethod(p_type: METHOD_TYPE, p_name: string, p_callback: MethodOnCallback): void {
        const method = new Method(p_type, p_name, p_callback);
        this.m_method_list.push(method);
    }

    private initMethodList(): void {
        this.addMethod(METHOD_TYPE.RUN_SERVER, 'run_server', ServerFacade.onRunServer);
    }

    private loadMethod(p_method: Ref<Method>): boolean {
        return this.m_method_list.loadMethodByName(p_method, this.m_name);
    }

    public getMethod(): Method {
        return this.m_method.value;
    }
}

export default class ServerModule implements ModuleInterface {
    private m_method: Method = new Method();
    private readonly m_args: string[] = [];

    constructor();
    constructor(p_args: string[]);

    constructor(p_args?: string[]) {
        if (p_args === undefined) {
            return;
        }
        this.m_args = p_args ?? [];
        if (this.m_args.length <= 0) {
            throw new Exception("Le nombre d'arguments est incorrect.");
        }
        const method_name = this.m_args[0];
        const method_factory = new MethodFactory(method_name);
        this.m_method = method_factory.getMethod();
    }

    public run(): void {
        this.m_method.onCallback()(this.m_args.slice(1));
    }
}
