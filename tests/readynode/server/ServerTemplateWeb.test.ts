import ServerTemplateWeb, { PARAM_TEMPLATE_ROOT } from '@readynode/server/ServerTemplateWeb';
import fs from 'fs';
import path from 'path';

const DEF_TEST_DIR = path.join(PARAM_TEMPLATE_ROOT, '/tmp');
const DEF_TEMPLATE_FILE = path.join(DEF_TEST_DIR, '/test_template_file.ejs.html');
const DEF_TEMPLATE_EJS = '/tmp/test_template_file.ejs.html';

function onWriteFile(p_text: string): void {
    fs.writeFileSync(DEF_TEMPLATE_FILE, p_text, 'utf8');
}

function onRemoveSpace(p_text: string): string {
    return p_text.trim().replace(/^[ \t]+/gm, '');
}

describe('TestServerTemplateWeb', () => {
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
            new ServerTemplateWeb('', {});
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
            new ServerTemplateWeb('PATH_TEMPLATE', {});
        }).toThrow(DEF_MSG_EXCEPTION);

        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_ERREUR));
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_EXCEPTION));
        logSpy.mockRestore();
    });

    it('Test_Template_Non_Charge', () => {
        const DEF_MSG_EXCEPTION = "Le template n'est pas charge.";

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        expect(() => {
            const server_template_web = new ServerTemplateWeb(DEF_TEMPLATE_EJS, {});
            server_template_web.getHtml();
        }).toThrow(DEF_MSG_EXCEPTION);

        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_EXCEPTION));
        logSpy.mockRestore();
    });

    it('Test_Template_Invalide', async () => {
        const DEF_MSG_EXCEPTION = 'Le template est invalide.';

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        const DEF_TEXT_IN = onRemoveSpace(`<p>Nom: <%= name %></p>`);

        onWriteFile(DEF_TEXT_IN);

        const server_template_web = new ServerTemplateWeb(DEF_TEMPLATE_EJS, {});

        await expect(server_template_web.loadHtml()).rejects.toThrow(DEF_MSG_EXCEPTION);

        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_EXCEPTION));
        logSpy.mockRestore();
    });

    it('Test_Template_Valide', async () => {
        const DEF_TEXT_IN = onRemoveSpace(`<p>Nom: <%= name %></p>`);
        const DEF_TEXT_OUT = onRemoveSpace(`<p>Nom: NAME_TEMPLATE</p>`);

        onWriteFile(DEF_TEXT_IN);

        const server_template_web = new ServerTemplateWeb(DEF_TEMPLATE_EJS, {
            name: 'NAME_TEMPLATE'
        });

        await server_template_web.loadHtml();
        expect(server_template_web.getHtml()).toBe(DEF_TEXT_OUT);
    });
});
