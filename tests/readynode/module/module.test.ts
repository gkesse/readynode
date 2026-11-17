import { Module, MODULE_TYPE, ModuleInconnu } from '@readynode/module/ModuleFactory';

describe('TestModule', () => {
    it('Test_Module_Par_Defaut', () => {
        const module = new Module();
        expect(module.getType()).toBe(MODULE_TYPE.INCONNU);
        expect(module.getName()).toBe('inconnu');
        expect(module.onCreate()()).toBeInstanceOf(ModuleInconnu);
    });

    it('Test_Module_Inconnu', () => {
        const module = new Module(MODULE_TYPE.INCONNU, 'inconnu', () => new ModuleInconnu());
        expect(module.getType()).toBe(MODULE_TYPE.INCONNU);
        expect(module.getName()).toBe('inconnu');
        expect(module.onCreate()()).toBeInstanceOf(ModuleInconnu);
    });
});
