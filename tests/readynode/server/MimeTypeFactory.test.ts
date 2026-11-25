import { MimeTypeFactory } from '@readynode/server/ResourceLoader';

describe('TestServerMimeTypeFactory', () => {
    it('Test_Mime_Type_Factory_Par_Defaut', () => {
        const mime_type_factory = new MimeTypeFactory();
        expect(mime_type_factory.getMimeType().getExtension()).toBe('');
        expect(mime_type_factory.getMimeType().getMimeType()).toBe('');
    });

    it('Test_Erreur_Mime_Type_Introuvable', () => {
        const DEF_MSG_EXCEPTION = 'Le type mime est introuvable.|extension=inconnu';

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        expect(() => {
            new MimeTypeFactory('inconnu');
        }).toThrow(DEF_MSG_EXCEPTION);

        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_EXCEPTION));
        logSpy.mockRestore();
    });

    it('Test_Mime_Type_Ts_Trouve', () => {
        const mime_type_factory = new MimeTypeFactory('.ts');
        expect(mime_type_factory.getMimeType().getExtension()).toBe('.ts');
        expect(mime_type_factory.getMimeType().getMimeType()).toBe('text/typescript');
    });
});
