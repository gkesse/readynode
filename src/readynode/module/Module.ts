export enum MODULE_TYPE {
    INCONNU,
    SERVER
}

export class ModuleData {
    m_type: MODULE_TYPE = MODULE_TYPE.INCONNU;
    m_name: string = 'inconnu';
    m_description: string = 'Module inconnu.';
}

export type ModuleList = ModuleData[];

export default class Module {
    private m_module_list: ModuleList = [];

    constructor() {
        this.addModule(MODULE_TYPE.SERVER, 'server', 'Module de gestion du serveur HTTP.');
    }

    public getModuleListe(): ModuleList {
        return this.m_module_list;
    }

    private addModule(p_type: MODULE_TYPE, p_name: string, p_description: string): void {
        const module = new ModuleData();
        module.m_type = p_type;
        module.m_name = p_name;
        module.m_description = p_description;
        this.m_module_list.push(module);
    }
}
