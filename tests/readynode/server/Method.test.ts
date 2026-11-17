import { Method, METHOD_TYPE } from '@readynode/server/ServerModule';

describe('TestServerMethod', () => {
    it('Test_Server_Module_Par_Defaut', () => {
        const method = new Method();
        expect(method.getType()).toBe(METHOD_TYPE.INCONNU);
        expect(method.getName()).toBe('inconnu');
        expect(method.onCallback()([])).toBeUndefined();
    });

    it('Test_Appel_Callback', () => {
        const onCallback = (p_args: string[]) => {
            console.log('Ceci est un message de test:', p_args);
        };
        const method = new Method(METHOD_TYPE.INCONNU, 'inconnu', onCallback);
        expect(method.getType()).toBe(METHOD_TYPE.INCONNU);
        expect(method.getName()).toBe('inconnu');

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        method.onCallback()(['arg1', 'arg2']);
        expect(logSpy).toHaveBeenCalledWith('Ceci est un message de test:', ['arg1', 'arg2']);
        logSpy.mockRestore();
    });
});
