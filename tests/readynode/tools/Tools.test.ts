import { Tools } from '@readynode/tools/Tools';
import path, { sep } from 'path';

const DEF_TEST_DIR = path.join(__dirname, '/test_dir');
const DEF_TEST_FILE = path.join(DEF_TEST_DIR, '/test_tools_file.txt');

describe('TestTools', () => {
    // [texte]
    it('Test_Texte_Non_Entier', () => {
        expect(Tools.isNumber('abc')).toBe(false);
        expect(Tools.isNumber('123abc')).toBe(false);
        expect(Tools.isNumber('123.123')).toBe(false);
    });

    it('Test_Texte_Entier', () => {
        expect(Tools.isNumber('123')).toBe(true);
    });

    it('Test_Texte_Suppression_Espace', () => {
        const DEF_TEXT_WRITE = `
        Ceci est un message de test.
        Ceci est un message de test.
        `;

        const DEF_TEXT_READ = 'Ceci est un message de test.\nCeci est un message de test.';

        expect(Tools.removeSpace(DEF_TEXT_WRITE)).toBe(DEF_TEXT_READ);
    });

    it('Test_Texte_Vers_Buffer', () => {
        const DEF_TEXT_WRITE = 'Ceci est un message de test.';

        expect(Tools.toBuffer(DEF_TEXT_WRITE).length).toBe(28);
        expect(Tools.toBuffer(DEF_TEXT_WRITE).toString('utf8')).toBe(DEF_TEXT_WRITE);
    });

    // [path]
    it('Test_Path_Jointure', () => {
        expect(Tools.joinPath('')).toBe('.');
        expect(Tools.joinPath('', '')).toBe('.');
        expect(Tools.joinPath('', '', '')).toBe('.');
        expect(Tools.joinPath('.', '.')).toBe('.');
        expect(Tools.joinPath('.', '.', '.')).toBe('.');
        expect(Tools.joinPath('.', 'PATH_1')).toBe('PATH_1');
        expect(Tools.joinPath('.', 'PATH_1', 'PATH_2')).toBe(`PATH_1${sep}PATH_2`);
        expect(Tools.joinPath('', 'PATH_1')).toBe('PATH_1');
        expect(Tools.joinPath('', 'PATH_1', 'PATH_2')).toBe(`PATH_1${sep}PATH_2`);
        expect(Tools.joinPath('PATH_1', 'PATH_2', 'PATH_3')).toBe(`PATH_1${sep}PATH_2${sep}PATH_3`);
        expect(Tools.joinPath(__dirname, 'PATH_1')).toBe(`${__dirname}${sep}PATH_1`);
        expect(Tools.joinPath(__dirname, 'PATH_1', 'PATH_2')).toBe(
            `${__dirname}${sep}PATH_1${sep}PATH_2`
        );
    });

    // [repertoire]
    it('Test_Repertoire_Creation_Suppression', () => {
        Tools.createDir(DEF_TEST_DIR);
        expect(Tools.existsDir(DEF_TEST_DIR)).toBe(true);

        Tools.removeDir(DEF_TEST_DIR);
        expect(Tools.existsDir(DEF_TEST_DIR)).toBe(false);
    });

    it('Test_Repertoire_Generation', () => {
        const DEF_DIR_GENERATE = Tools.generateDir(__dirname, 'test_dir');
        const DEF_DIR_BASE = Tools.joinPath(__dirname, 'test_dir');

        expect(DEF_DIR_GENERATE).toContain(DEF_DIR_BASE);
        expect(DEF_DIR_GENERATE.length).toBeGreaterThan(DEF_DIR_BASE.length + 32);
    });

    // [fichier]
    it('Test_Fichier_Creation_Suppression', () => {
        Tools.createFile(DEF_TEST_FILE);
        expect(Tools.existsFile(DEF_TEST_FILE)).toBe(true);

        Tools.removeFile(DEF_TEST_FILE);
        expect(Tools.existsFile(DEF_TEST_FILE)).toBe(false);

        Tools.removeDir(DEF_TEST_DIR);
        expect(Tools.existsDir(DEF_TEST_DIR)).toBe(false);
    });

    it('Test_Fichier_Ecriture_Lecture', () => {
        const DEF_TEXT_WRITE = Tools.removeSpace(`
            Ceci est un message de test.
            Ceci est un message de test.
            `);

        Tools.createFile(DEF_TEST_FILE);
        Tools.writeFile(DEF_TEST_FILE, DEF_TEXT_WRITE);
        const DEF_TEXT_READ = Tools.readFile(DEF_TEST_FILE);

        expect(DEF_TEXT_READ).toBe(DEF_TEXT_WRITE);

        Tools.removeDir(DEF_TEST_DIR);
        expect(Tools.existsDir(DEF_TEST_DIR)).toBe(false);
    });

    // [binaire]
    it('Test_Binaire_Ecriture_Lecture', () => {
        const DEF_TEXT_WRITE = Tools.removeSpace(`
            Ceci est un message de test.
            Ceci est un message de test.
            `);

        Tools.createFile(DEF_TEST_FILE);
        Tools.writeBinary(DEF_TEST_FILE, Tools.toBuffer(DEF_TEXT_WRITE));
        const DEF_TEXT_READ = Tools.readFile(DEF_TEST_FILE);

        expect(DEF_TEXT_READ).toBe(DEF_TEXT_WRITE);

        Tools.removeDir(DEF_TEST_DIR);
        expect(Tools.existsDir(DEF_TEST_DIR)).toBe(false);
    });

    // [tmp]
    it('Test_Repertoire_Temporaire_Lecture', () => {
        expect(Tools.getTmpDir()).toBeTruthy();
    });

    it('Test_Repertoire_Temporaire_Generation', () => {
        expect(Tools.generateTmpDir()).toContain(Tools.getTmpDir());
    });
});
