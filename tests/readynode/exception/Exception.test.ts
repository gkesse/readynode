import { Exception } from '@readynode/exception/Exception';

describe('TestException', () => {
    it('Test_Exception_Lancement', () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        const onExeception = () => {
            throw new Exception('Ceci est une exception.');
        };

        expect(() => {
            onExeception();
        }).toThrow('Ceci est une exception.');

        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Ceci est une exception.'));
        logSpy.mockRestore();
    });
});
