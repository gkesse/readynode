import ServerTemplate from '@readynode/server/ServerTemplate';
import fs from 'fs';
import path from 'path';

const DEF_TEST_DIR = path.join(__dirname, 'tmp');
const DEF_TEMPLATE_FILE = path.join(DEF_TEST_DIR, '/test_template_file.ejs.html');

function onWriteFile(p_text: string): void {
    fs.writeFileSync(DEF_TEMPLATE_FILE, p_text, 'utf8');
}

function onRemoveSpace(p_text: string): string {
    return p_text.trim().replace(/^[ \t]+/gm, '');
}

describe('TestServerTemplate', () => {
    beforeEach(() => {
        fs.mkdirSync(DEF_TEST_DIR, { recursive: true });
        fs.writeFileSync(DEF_TEMPLATE_FILE, '');
    });

    afterEach(() => {
        if (fs.existsSync(DEF_TEST_DIR)) {
            fs.rmSync(DEF_TEST_DIR, { recursive: true, force: true });
        }
    });

    it('Test_Template_Chemin_Vide', () => {
        const DEF_MSG_ERREUR = 'Le chemin du template est vide.';
        const DEF_MSG_EXCEPTION = 'Le template est introuvable.';

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        expect(() => {
            new ServerTemplate('', '', {});
        }).toThrow(DEF_MSG_EXCEPTION);

        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_ERREUR));
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_EXCEPTION));
        logSpy.mockRestore();
    });

    it('Test_Template_Chemin_Introuvable', () => {
        const DEF_MSG_ERREUR = 'Le chemin du template est introuvable.';
        const DEF_MSG_EXCEPTION = 'Le template est introuvable.';

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        expect(() => {
            new ServerTemplate('', 'PATH_TEMPLATE', {});
        }).toThrow(DEF_MSG_EXCEPTION);

        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_ERREUR));
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_EXCEPTION));
        logSpy.mockRestore();
    });

    it('Test_Template_Non_Fichier', () => {
        const DEF_MSG_ERREUR = "Le template n'est pas un fichier.";
        const DEF_MSG_EXCEPTION = 'Le template est introuvable.';

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        expect(() => {
            new ServerTemplate('', '.', {});
        }).toThrow(DEF_MSG_EXCEPTION);

        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_ERREUR));
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_EXCEPTION));
        logSpy.mockRestore();
    });

    it('Test_Template_Non_Charge', () => {
        const DEF_MSG_EXCEPTION = "Le template n'est pas charge.";

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        expect(() => {
            const server_template = new ServerTemplate('', DEF_TEMPLATE_FILE, {});
            server_template.getHtml();
        }).toThrow(DEF_MSG_EXCEPTION);

        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_EXCEPTION));
        logSpy.mockRestore();
    });

    it('Test_Template_Invalide', async () => {
        const DEF_MSG_EXCEPTION = 'Le template est invalide.';

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        const DEF_TEXT_IN = onRemoveSpace(`<p>Nom: <%= name %></p>`);

        onWriteFile(DEF_TEXT_IN);

        const server_template = new ServerTemplate('', DEF_TEMPLATE_FILE, {});

        await expect(server_template.loadHtml()).rejects.toThrow(DEF_MSG_EXCEPTION);

        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_EXCEPTION));
        logSpy.mockRestore();
    });

    it('Test_Template_Valide', async () => {
        const DEF_TEXT_IN = onRemoveSpace(`<p>Nom: <%= name %></p>`);
        const DEF_TEXT_OUT = onRemoveSpace(`<p>Nom: NAME_TEMPLATE</p>`);

        onWriteFile(DEF_TEXT_IN);

        const server_template = new ServerTemplate('', DEF_TEMPLATE_FILE, {
            name: 'NAME_TEMPLATE'
        });

        await server_template.loadHtml();
        expect(server_template.getHtml()).toBe(DEF_TEXT_OUT);
    });
});
