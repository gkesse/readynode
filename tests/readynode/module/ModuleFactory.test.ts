import ModuleFactory, { MODULE_TYPE, ModuleInconnu } from '@readynode/module/ModuleFactory';

describe('TestModuleFactory', () => {
    it('Test_Module_Factory_Par_Defaut', () => {
        const obj = new ModuleFactory();
        expect(obj.getModule().getType()).toBe(MODULE_TYPE.INCONNU);
        expect(obj.getModule().getName()).toBe('inconnu');
        expect(obj.getModule().onCreate()()).toBeInstanceOf(ModuleInconnu);
    });

    it('Test_Module_Introuvable', () => {
        const DEF_MSG_EXCEPTION = 'Le module est introuvable.';

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        expect(() => {
            new ModuleFactory('inconnu', ['inconnu']);
        }).toThrow(DEF_MSG_EXCEPTION);

        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_EXCEPTION));
        logSpy.mockRestore();
    });

    it('Test_Module_Server', () => {
        const obj = new ModuleFactory('server', ['server']);
        expect(obj.getModule().getType()).toBe(MODULE_TYPE.SERVER);
        expect(obj.getModule().getName()).toBe('server');
    });
});
