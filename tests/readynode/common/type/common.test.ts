import { Ref } from '@readynode/common/type/common';

describe('TestCommonType', () => {
    it('Test_Pointeur_Par_Reference', () => {
        const nombre: Ref<number> = { value: 5 };

        expect(nombre.value).toBe(5);

        const onModifierNombre = (p_nombre: Ref<number>) => {
            p_nombre.value = 10;
        };

        onModifierNombre(nombre);

        expect(nombre.value).toBe(10);
    });
});
