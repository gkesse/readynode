import { MODULE_TYPE, ModuleData } from '@readynode/module/Module';

describe('TestModule', () => {
    // teste un mdoule data par defaut
    it('Test_Module_Data_Par_Defaut', () => {
        const module = new ModuleData();
        expect(module.m_type).toBe(MODULE_TYPE.INCONNU);
        expect(module.m_name).toBe('inconnu');
        expect(module.m_description).toBe('Module inconnu.');
    });
});
