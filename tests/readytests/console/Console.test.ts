describe('TestConsole', () => {
    it('Test_Capture_Console_Log', () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        console.log('Ceci est un message de test.');

        expect(logSpy).toHaveBeenCalledWith('Ceci est un message de test.');

        logSpy.mockRestore();
    });
});
