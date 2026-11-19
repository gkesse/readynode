import ResourceLoader from '@readynode/server/ResourceLoader';
import { PARAM_SERVER_ROOT } from '@readynode/server/ServerTemplateWeb';
import { Tools } from '@readynode/tools/Tools';

const DEF_TEST_DIR = Tools.joinPath(PARAM_SERVER_ROOT, '/test_dir');
const DEF_TEST_RESOURCE_FILE = Tools.joinPath(DEF_TEST_DIR, '/test_resource_file.html');
const DEF_TEST_RESOURCE_PATH = '/test_dir/test_resource_file.html';

describe('TestServerResourceLoader', () => {
    beforeEach(() => {
        Tools.createFile(DEF_TEST_RESOURCE_FILE);
    });

    afterEach(() => {
        Tools.removeDir(DEF_TEST_DIR);
    });

    it('Test_Resource_Chemin_Vide', () => {
        const DEF_MSG_ERREUR = 'Le chemin de la ressource est vide.';
        const DEF_MSG_EXCEPTION = 'La ressource est introuvable.';

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        expect(() => {
            new ResourceLoader('');
        }).toThrow(DEF_MSG_EXCEPTION);

        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_ERREUR));
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_EXCEPTION));
        logSpy.mockRestore();
    });

    it('Test_Resource_Chemin_Introuvable', () => {
        const DEF_MSG_ERREUR = 'Le chemin de la ressource est introuvable.';
        const DEF_MSG_EXCEPTION = 'La ressource est introuvable.';

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        expect(() => {
            new ResourceLoader('PATH_RESOURCE');
        }).toThrow(DEF_MSG_EXCEPTION);

        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_ERREUR));
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_EXCEPTION));
        logSpy.mockRestore();
    });

    it('Test_Resource_Fichier_Trouve', () => {
        const DEF_TEXT_WRITE = Tools.removeSpace(`
            <p>Bonjour tout le monde.</p>
            </p>Ceci est un message de texte.</p>
            `);

        Tools.writeFile(DEF_TEST_RESOURCE_FILE, DEF_TEXT_WRITE);

        const DEF_MSG_DEBUG = 'Le type mime est introuvable.|extension=.html';

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        const resource_loader = new ResourceLoader(DEF_TEST_RESOURCE_PATH);

        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_DEBUG));

        expect(resource_loader.getExtension()).toBe('.html');
        expect(resource_loader.getMimeType()).toBe('text/html');
        expect(resource_loader.getContentType()).toBe('text/html; charset=utf-8');
        expect(resource_loader.getContentLength()).toBe(DEF_TEXT_WRITE.length);
        expect(resource_loader.getContentText()).toBe(DEF_TEXT_WRITE);
    });
});
