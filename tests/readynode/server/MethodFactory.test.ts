import { METHOD_TYPE, MethodFactory } from '@readynode/server/ServerModule';

describe('TestServerMethodFactory', () => {
    it('Test_Method_Factory_Par_Defaut', () => {
        const method_factory = new MethodFactory();
        expect(method_factory.getMethod().getType()).toBe(METHOD_TYPE.INCONNU);
        expect(method_factory.getMethod().getName()).toBe('inconnu');
        expect(method_factory.getMethod().onCallback()([])).toBeUndefined();
    });

    it('Test_Method_Introuvable', () => {
        const DEF_MSG_EXCEPTION = 'La methode est introuvable.';

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        expect(() => {
            new MethodFactory('inconnu');
        }).toThrow(DEF_MSG_EXCEPTION);

        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_EXCEPTION));
        logSpy.mockRestore();
    });

    it('Test_Method_Run_Server', () => {
        const method_factory = new MethodFactory('run_server');
        expect(method_factory.getMethod().getType()).toBe(METHOD_TYPE.RUN_SERVER);
        expect(method_factory.getMethod().getName()).toBe('run_server');
    });
});
