import { Ref } from '@readynode/common/type/common';
import {
    Module,
    MODULE_TYPE,
    ModuleInconnu,
    ModuleList,
    ModuleOnCreate
} from '@readynode/module/ModuleFactory';

describe('TestModuleList', () => {
    it('Test_Module_List_Par_Defaut', () => {
        const module_list = new ModuleList();
        expect(module_list.length).toBe(0);
    });

    it('Test_Module_Non_Trouve', () => {
        const module_list = new ModuleList();

        const onAddModule = (p_type: MODULE_TYPE, p_name: string, p_on_create: ModuleOnCreate) => {
            const module = new Module(p_type, p_name, p_on_create);
            module_list.push(module);
        };

        onAddModule(MODULE_TYPE.INCONNU, 'no_module', () => new ModuleInconnu());

        expect(module_list.length).toBe(1);

        const module: Ref<Module> = { value: new Module() };

        expect(module_list.loadModuleByName(module, 'inconnu')).toBe(false);

        expect(module.value.getType()).toBe(MODULE_TYPE.INCONNU);
        expect(module.value.getName()).toBe('inconnu');
        expect(module.value.onCreate()()).toBeInstanceOf(ModuleInconnu);
    });

    it('Test_Module_Trouve', () => {
        const module_list = new ModuleList();

        const onAddModule = (p_type: MODULE_TYPE, p_name: string, p_on_create: ModuleOnCreate) => {
            const module = new Module(p_type, p_name, p_on_create);
            module_list.push(module);
        };

        onAddModule(MODULE_TYPE.INCONNU, 'inconnu', () => new ModuleInconnu());

        expect(module_list.length).toBe(1);

        const module: Ref<Module> = { value: new Module() };

        expect(module_list.loadModuleByName(module, 'inconnu')).toBe(true);

        expect(module.value.getType()).toBe(MODULE_TYPE.INCONNU);
        expect(module.value.getName()).toBe('inconnu');
        expect(module.value.onCreate()()).toBeInstanceOf(ModuleInconnu);
    });
});
