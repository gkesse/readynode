import ServerTemplateWeb from '@readynode/server/ServerTemplateWeb';
import { Tools } from '@readynode/tools/Tools';

const DEF_TEST_DIR = Tools.joinPath(__dirname, 'TestServerTemplateWeb');
const DEF_TEST_TEMPLATE_FILE = Tools.joinPath(DEF_TEST_DIR, 'test_template_file.ejs.html');
const DEF_TEST_EMPLATE_PATH = 'test_template_file.ejs.html';

describe('TestServerTemplateWeb', () => {
    beforeEach(() => {
        Tools.createFile(DEF_TEST_TEMPLATE_FILE);
    });

    afterEach(() => {
        Tools.removeDir(DEF_TEST_DIR);
    });

    it('Test_Template_Chemin_Racine', () => {
        expect(ServerTemplateWeb.getTemplateRoot()).toBe('./src/readynode/server/web/template');
    });

    it('Test_Server_Chemin_Racine', () => {
        expect(ServerTemplateWeb.getServerRoot()).toBe('./src/readynode/server/web/root');
    });

    it('Test_Erreur_Template_Chemin_Vide', () => {
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

    it('Test_Erreur_Template_Chemin_Introuvable', () => {
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

    it('Test_Erreur_Template_Non_Charge', () => {
        const DEF_MSG_EXCEPTION = "Le template n'est pas charge.";

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        jest.spyOn(ServerTemplateWeb, 'getTemplateRoot').mockReturnValue(DEF_TEST_DIR);

        expect(() => {
            const server_template_web = new ServerTemplateWeb(DEF_TEST_EMPLATE_PATH, {});
            server_template_web.getHtml();
        }).toThrow(DEF_MSG_EXCEPTION);

        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_EXCEPTION));
        jest.restoreAllMocks();
    });

    it('Test_Erreur_Template_Invalide', async () => {
        const DEF_MSG_EXCEPTION = 'Le template est invalide.';

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        jest.spyOn(ServerTemplateWeb, 'getTemplateRoot').mockReturnValue(DEF_TEST_DIR);

        const DEF_TEXT_WRITE = Tools.removeSpace(`<p>Nom: <%= name %></p>`);
        Tools.writeFile(DEF_TEST_TEMPLATE_FILE, DEF_TEXT_WRITE);

        const server_template_web = new ServerTemplateWeb(DEF_TEST_EMPLATE_PATH, {});
        await expect(server_template_web.loadHtml()).rejects.toThrow(DEF_MSG_EXCEPTION);

        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_EXCEPTION));
        jest.restoreAllMocks();
    });

    it('Test_Template_Valide', async () => {
        const DEF_TEXT_WRITE = Tools.removeSpace(`<p>Nom: <%= name %></p>`);
        const DEF_TEXT_READ = Tools.removeSpace(`<p>Nom: NAME_TEMPLATE</p>`);

        jest.spyOn(ServerTemplateWeb, 'getTemplateRoot').mockReturnValue(DEF_TEST_DIR);
        Tools.writeFile(DEF_TEST_TEMPLATE_FILE, DEF_TEXT_WRITE);

        const server_template_web = new ServerTemplateWeb(DEF_TEST_EMPLATE_PATH, {
            name: 'NAME_TEMPLATE'
        });

        await server_template_web.loadHtml();
        expect(server_template_web.getHtml()).toBe(DEF_TEXT_READ);

        jest.restoreAllMocks();
    });
});
