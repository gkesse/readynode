import { Ref } from '@readynode/common/type/common';
import { Method, METHOD_TYPE, MethodList, MethodOnCallback } from '@readynode/server/ServerModule';

describe('TestServerMethodList', () => {
    it('Test_Method_List_Par_Defaut', () => {
        const method_list = new MethodList();
        expect(method_list.length).toBe(0);
    });

    it('Test_Method_Non_Trouve', () => {
        const method_list = new MethodList();

        const onAddMethod = (
            p_type: METHOD_TYPE,
            p_name: string,
            p_on_callback: MethodOnCallback
        ) => {
            const method = new Method(p_type, p_name, p_on_callback);
            method_list.push(method);
        };

        onAddMethod(METHOD_TYPE.INCONNU, 'no_method', (_p_args: string[]) => {});

        expect(method_list.length).toBe(1);

        const method: Ref<Method> = { value: new Method() };

        expect(method_list.loadMethodByName(method, 'inconnu')).toBe(false);

        expect(method.value.getType()).toBe(METHOD_TYPE.INCONNU);
        expect(method.value.getName()).toBe('inconnu');
        expect(method.value.onCallback()([])).toBeUndefined();
    });

    it('Test_Method_Trouve', () => {
        const method_list = new MethodList();

        const onAddMethod = (
            p_type: METHOD_TYPE,
            p_name: string,
            p_on_callback: MethodOnCallback
        ) => {
            const method = new Method(p_type, p_name, p_on_callback);
            method_list.push(method);
        };

        onAddMethod(METHOD_TYPE.INCONNU, 'inconnu', (_p_args: string[]) => {});

        expect(method_list.length).toBe(1);

        const method: Ref<Method> = { value: new Method() };

        expect(method_list.loadMethodByName(method, 'inconnu')).toBe(true);

        expect(method.value.getType()).toBe(METHOD_TYPE.INCONNU);
        expect(method.value.getName()).toBe('inconnu');
        expect(method.value.onCallback()([])).toBeUndefined();
    });
});
