import { Ref } from '@readynode/common/type/common';
import { Exception } from '@readynode/exception/Exception';
import Logger from '@readynode/logger/Logger';
import fs from 'fs';
import path from 'path';
import ServerTemplate from './ServerTemplate';

export const PARAM_SERVER_ROOT: string = './src/readynode/server/web/public';
export const PARAM_TEMPLATE_ROOT: string = './src/readynode/server/web/template';

export default class ServerTemplateWeb {
    private readonly m_dirname: string = PARAM_TEMPLATE_ROOT;
    private readonly m_filename: Ref<string> = { value: '' };
    private readonly m_index_file_list: string[] = [];
    private readonly m_template: ServerTemplate;
    private m_is_load: boolean = false;

    constructor(p_template: string, p_data: ejs.Data) {
        this.initIndexFileList();
        if (!this.loadFilename(this.m_filename, p_template)) {
            throw new Exception('Le template est introuvable.');
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

        const filename = path.join(this.m_dirname, p_template);

        if (!fs.existsSync(filename)) {
            Logger.logError('Le chemin du template est introuvable.');
            return false;
        }

        const stats = fs.statSync(filename);

        if (stats.isFile()) {
            p_filename.value = filename;
            return true;
        }

        if (stats.isDirectory()) {
            for (const index_file of this.m_index_file_list) {
                const index_filename = path.join(filename, index_file);

                if (!fs.existsSync(index_filename)) {
                    continue;
                }

                const index_stats = fs.statSync(index_filename);

                if (index_stats.isFile()) {
                    p_filename.value = index_filename;
                    return true;
                }
            }
        }

        Logger.logError('Le chemin du template est invalide.');
        return false;
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
