import ResourceLoader from '@readynode/server/ResourceLoader';
import { PARAM_SERVER_ROOT } from '@readynode/server/ServerTemplateWeb';
import fs from 'fs';
import path from 'path';

const DEF_TEST_DIR = path.join(PARAM_SERVER_ROOT, '/tmp');
const DEF_RESOURCE_FILE = path.join(DEF_TEST_DIR, '/test_resource_file.html');
const DEF_RESOURCE_PATH = '/tmp/test_resource_file.html';

function onWriteFile(p_text: string): void {
    fs.writeFileSync(DEF_RESOURCE_FILE, p_text, 'utf8');
}

function onRemoveSpace(p_text: string): string {
    return p_text.trim().replace(/^[ \t]+/gm, '');
}

describe('TestResourceLoader', () => {
    beforeEach(() => {
        fs.mkdirSync(DEF_TEST_DIR, { recursive: true });
        fs.writeFileSync(DEF_RESOURCE_FILE, '');
    });

    afterEach(() => {
        if (fs.existsSync(DEF_TEST_DIR)) {
            fs.rmSync(DEF_TEST_DIR, { recursive: true, force: true });
        }
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

    it('Test_Resource_Chemin_Non_Fichier', () => {
        const DEF_MSG_ERREUR = "Le chemin de la ressource n'est pas un fichier.";
        const DEF_MSG_EXCEPTION = 'La ressource est introuvable.';

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        expect(() => {
            new ResourceLoader('.');
        }).toThrow(DEF_MSG_EXCEPTION);

        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_ERREUR));
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_EXCEPTION));
        logSpy.mockRestore();
    });

    it('Test_Resource_Fichier_Trouve', () => {
        const DEF_TEXT_IN = onRemoveSpace(`
            <p>Bonjour tout le monde.</p>
            </p>Ceci est un message de texte.</p>
            `);

        onWriteFile(DEF_TEXT_IN);

        const DEF_MSG_DEBUG = 'Le type mime est introuvable.|extension=.html';

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        const resource_loader = new ResourceLoader(DEF_RESOURCE_PATH);

        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_DEBUG));

        expect(resource_loader.getExtension()).toBe('.html');
        expect(resource_loader.getMimeType()).toBe('text/html');
        expect(resource_loader.getContentType()).toBe('text/html; charset=utf-8');
        expect(resource_loader.getContentLength()).toBe(DEF_TEXT_IN.length);
        expect(resource_loader.getContentText()).toBe(DEF_TEXT_IN);
    });
});
