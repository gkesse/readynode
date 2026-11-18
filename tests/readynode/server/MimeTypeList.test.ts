import { Ref } from '@readynode/common/type/common';
import { MimeType, MimeTypeList } from '@readynode/server/ResourceLoader';

describe('TestMimeTypeList', () => {
    it('Test_Mime_Type_List_Par_Defaut', () => {
        const mime_type_list = new MimeTypeList();
        expect(mime_type_list.length).toBe(0);
    });

    it('Test_Mime_Type_Non_Trouve', () => {
        const mime_type_list = new MimeTypeList();

        const onAddMimeType = (p_extension: string, p_mime_type: string) => {
            const mime_type = new MimeType(p_extension, p_mime_type);
            mime_type_list.push(mime_type);
        };

        onAddMimeType('EXTENSION', 'MIME_TYPE');

        expect(mime_type_list.length).toBe(1);

        const mime_type: Ref<MimeType> = { value: new MimeType() };

        expect(mime_type_list.loadMimeTypeByExtension(mime_type, 'inconnu')).toBe(false);

        expect(mime_type.value.getExtension()).toBe('');
        expect(mime_type.value.getMimeType()).toBe('');
    });

    it('Test_Mime_Type_List_Trouve', () => {
        const mime_type_list = new MimeTypeList();

        const onAddMimeType = (p_extension: string, p_mime_type: string) => {
            const mime_type = new MimeType(p_extension, p_mime_type);
            mime_type_list.push(mime_type);
        };

        onAddMimeType('EXTENSION', 'MIME_TYPE');

        expect(mime_type_list.length).toBe(1);

        const mime_type: Ref<MimeType> = { value: new MimeType() };

        expect(mime_type_list.loadMimeTypeByExtension(mime_type, 'EXTENSION')).toBe(true);

        expect(mime_type.value.getExtension()).toBe('EXTENSION');
        expect(mime_type.value.getMimeType()).toBe('MIME_TYPE');
    });
});
