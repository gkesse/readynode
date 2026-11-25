import { Ref } from '@readynode/common/type/common';
import { Exception } from '@readynode/exception/Exception';
import Logger from '@readynode/logger/Logger';
import { Tools } from '@readynode/tools/Tools';
import ServerTemplate from './ServerTemplate';

export default class ServerTemplateWeb {
    private readonly m_dirname: string = ServerTemplateWeb.getTemplateRoot();
    private readonly m_filename: Ref<string> = { value: '' };
    private readonly m_index_file_list: string[] = [];
    private readonly m_template: ServerTemplate;
    private m_is_load: boolean = false;

    constructor(p_template: string, p_data: ejs.Data) {
        this.initIndexFileList();
        if (!this.loadFilename(this.m_filename, p_template)) {
            throw new Exception(`Le template est introuvable.|template=${p_template}`);
        }
        this.m_template = new ServerTemplate('', this.m_filename.value, p_data);
    }

    private addIndexFile(p_index_file: string): void {
        this.m_index_file_list.push(p_index_file);
    }

    private initIndexFileList(): void {
        this.addIndexFile('index.ejs.html');
    }

    private loadFilename(p_filename: Ref<string>, p_template: string): boolean {
        if (p_template === '') {
            Logger.logError('Le chemin du template est vide.');
            return false;
        }

        const filename = Tools.joinPath(this.m_dirname, p_template);

        if (Tools.existsDir(filename)) {
            for (const index_file of this.m_index_file_list) {
                const index_filename = Tools.joinPath(filename, index_file);

                if (Tools.existsFile(index_filename)) {
                    p_filename.value = index_filename;
                    return true;
                }
            }
        }

        if (!Tools.existsFile(filename)) {
            Logger.logError(`Le chemin du template est introuvable.|template=${p_template}`);
            return false;
        }

        p_filename.value = filename;
        return true;
    }

    public static getServerRoot(): string {
        return './src/readynode/server/web/root';
    }

    public static getTemplateRoot(): string {
        return './src/readynode/server/web/template';
    }

    public async loadHtml(): Promise<void> {
        await this.m_template.loadHtml();
        this.m_is_load = true;
    }

    public getHtml(): string {
        if (!this.m_is_load) {
            throw new Exception("Le template n'est pas charge.");
        }
        return this.m_template.getHtml();
    }
}
