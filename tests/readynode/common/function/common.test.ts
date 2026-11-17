import { isNumber } from '@readynode/common/function/common';

describe('TestCommonFunction', () => {
    it('Test_Is_Not_Number', () => {
        expect(isNumber('abc')).toBe(false);
        expect(isNumber('123abc')).toBe(false);
        expect(isNumber('123.123')).toBe(false);
    });

    it('Test_Is_Number', () => {
        expect(isNumber('123')).toBe(true);
    });
});
