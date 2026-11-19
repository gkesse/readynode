import { Ref } from '@readynode/common/type/common';
import { Exception } from '@readynode/exception/Exception';
import Logger from '@readynode/logger/Logger';
import { Tools } from '@readynode/tools/Tools';
import ejs from 'ejs';

export default class ServerTemplate {
    private readonly m_filename: Ref<string> = { value: '' };
    private readonly m_data: ejs.Data;
    private m_is_load: boolean = false;
    private m_html: string = '';

    constructor(p_dirname: string, p_template: string, p_data: ejs.Data) {
        if (!this.loadFilename(this.m_filename, p_dirname, p_template)) {
            throw new Exception('Le template est introuvable.');
        }
        this.m_data = p_data;
    }

    private loadFilename(p_filename: Ref<string>, p_dirname: string, p_template: string) {
        if (p_template === '') {
            Logger.logError('Le chemin du template est vide.');
            return false;
        }

        const filename = Tools.joinPath(p_dirname, p_template);

        if (!Tools.existsFile(filename)) {
            Logger.logError('Le chemin du template est introuvable.');
            return false;
        }

        p_filename.value = filename;

        return true;
    }

    public async loadHtml(): Promise<void> {
        try {
            this.m_html = await ejs.renderFile(this.m_filename.value, this.m_data);
            this.m_is_load = true;
        } catch (p_error) {
            let erreur: string;
            if (p_error instanceof Error) {
                erreur = p_error.message;
            } else {
                erreur = String(p_error);
            }
            throw new Exception(`Le template est invalide.|erreur=${erreur}`);
        }
    }

    public getHtml(): string {
        if (!this.m_is_load) {
            throw new Exception("Le template n'est pas charge.");
        }
        return this.m_html;
    }
}
