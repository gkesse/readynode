import { MimeType } from '@readynode/server/ResourceLoader';

describe('TestMimeType', () => {
    it('Test_Mime_Type_Par_Defaut', () => {
        const mime_type = new MimeType();
        expect(mime_type.getExtension()).toBe('');
        expect(mime_type.getMimeType()).toBe('');
    });

    it('Test_Mime_Type_Par_Donnees', () => {
        const mime_type = new MimeType('EXTENSION', 'MIME_TYPE');
        expect(mime_type.getExtension()).toBe('EXTENSION');
        expect(mime_type.getMimeType()).toBe('MIME_TYPE');
    });
});
