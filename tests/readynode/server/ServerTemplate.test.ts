import ServerTemplate from '@readynode/server/ServerTemplate';
import { Tools } from '@readynode/tools/Tools';

const DEF_TEST_DIR = Tools.joinPath(__dirname, 'TestServerTemplate');
const DEF_TEST_TEMPLATE_FILE = Tools.joinPath(DEF_TEST_DIR, 'test_template_file.ejs.html');
const DEF_TEST_TEMPLATE_PATH = 'test_template_file.ejs.html';

describe('TestServerTemplate', () => {
    beforeEach(() => {
        Tools.createFile(DEF_TEST_TEMPLATE_FILE);
    });

    afterEach(() => {
        Tools.removeDir(DEF_TEST_DIR);
    });

    it('Test_Erreur_Template_Chemin_Vide', () => {
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

    it('Test_Erreur_Template_Chemin_Introuvable', () => {
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

    it('Test_Erreur_Template_Non_Charge', () => {
        const DEF_MSG_EXCEPTION = "Le template n'est pas charge.";

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        expect(() => {
            const server_template = new ServerTemplate('', DEF_TEST_TEMPLATE_FILE, {});
            server_template.getHtml();
        }).toThrow(DEF_MSG_EXCEPTION);

        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_EXCEPTION));
        logSpy.mockRestore();
    });

    it('Test_Erreur_Template_Invalide', async () => {
        const DEF_MSG_EXCEPTION = 'Le template est invalide.';

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        const DEF_TEXT_WRITE = Tools.removeSpace(`<p>Nom: <%= name %></p>`);

        Tools.writeFile(DEF_TEST_TEMPLATE_FILE, DEF_TEXT_WRITE);

        const server_template = new ServerTemplate('', DEF_TEST_TEMPLATE_FILE, {});

        await expect(server_template.loadHtml()).rejects.toThrow(DEF_MSG_EXCEPTION);

        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_EXCEPTION));
        logSpy.mockRestore();
    });

    it('Test_Template_Valide', async () => {
        const DEF_TEXT_WRITE = Tools.removeSpace(`<p>Nom: <%= name %></p>`);
        const DEF_TEXT_READ = Tools.removeSpace(`<p>Nom: NAME_TEMPLATE</p>`);

        Tools.writeFile(DEF_TEST_TEMPLATE_FILE, DEF_TEXT_WRITE);

        const server_template = new ServerTemplate(DEF_TEST_DIR, DEF_TEST_TEMPLATE_PATH, {
            name: 'NAME_TEMPLATE'
        });

        await server_template.loadHtml();
        expect(server_template.getHtml()).toBe(DEF_TEXT_READ);
    });
});
