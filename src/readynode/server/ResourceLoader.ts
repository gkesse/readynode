import { Ref } from '@readynode/common/type/common';
import { Exception } from '@readynode/exception/Exception';
import Logger from '@readynode/logger/Logger';
import { Tools } from '@readynode/tools/Tools';
import mime from 'mime-types';
import ServerTemplateWeb from './ServerTemplateWeb';

export class MimeType {
    private readonly m_extension: string = '';
    private readonly m_mime_type: string = '';

    constructor();
    constructor(p_extension: string, p_mime_type: string);

    constructor(p_extension?: string, p_mime_type?: string) {
        this.m_extension = p_extension ?? '';
        this.m_mime_type = p_mime_type ?? '';
    }

    public getExtension(): string {
        return this.m_extension;
    }

    public getMimeType(): string {
        return this.m_mime_type;
    }
}

export class MimeTypeList extends Array<MimeType> {
    public loadMimeTypeByExtension(p_mime_type: Ref<MimeType>, p_extension: string): boolean {
        const mime_type = this.find((p_obj) => p_obj.getExtension() === p_extension);
        if (mime_type) {
            p_mime_type.value = mime_type;
            return true;
        }
        return false;
    }
}

export class MimeTypeFactory {
    private readonly m_mime_type_list: MimeTypeList = new MimeTypeList();
    private readonly m_mime_type: Ref<MimeType> = { value: new MimeType() };
    private readonly m_extension: string = '';

    constructor();
    constructor(p_extension: string);

    constructor(p_extension?: string) {
        if (p_extension === undefined) {
            return;
        }
        this.m_extension = p_extension ?? '';
        this.initMimeTypeList();
        if (!this.loadMimeType(this.m_mime_type)) {
            throw new Exception(
                `Le type mime est introuvable.|extension=${this.m_extension}`,
                false
            );
        }
    }

    private addMimeType(p_extension: string, p_mime_type: string): void {
        const mime_type = new MimeType(p_extension, p_mime_type);
        this.m_mime_type_list.push(mime_type);
    }

    private initMimeTypeList(): void {
        this.addMimeType('.ts', 'text/typescript');
    }

    private loadMimeType(p_mime_type: Ref<MimeType>): boolean {
        return this.m_mime_type_list.loadMimeTypeByExtension(p_mime_type, this.m_extension);
    }

    public getMimeType(): MimeType {
        return this.m_mime_type.value;
    }
}

export default class ResourceLoader {
    private readonly m_dirname: string = ServerTemplateWeb.getServerRoot();
    private readonly m_filename: Ref<string> = { value: '' };
    private readonly m_extension: string = '';
    private readonly m_mime_type: string = '';
    private readonly m_data: Buffer;

    constructor(p_resource_file: string) {
        if (!this.loadFilename(this.m_filename, p_resource_file)) {
            throw new Exception(`La ressource est introuvable.|url=${p_resource_file}`, false);
        }

        this.m_extension = Tools.getExtension(p_resource_file).toLowerCase();

        if (this.m_extension === '') {
            throw new Exception("L'extension de la ressource est vide.");
        }

        this.m_mime_type = this.loadMimeType(this.m_extension);

        if (!this.m_mime_type) {
            throw new Exception('Le type mime de la ressource est introuvable.');
        }

        this.m_data = Tools.readBinary(this.m_filename.value);
        Logger.logInfo(`La ressource a ete chargee avec succes.|url=${p_resource_file}`);
    }

    private loadFilename(p_filename: Ref<string>, p_resource_file: string): boolean {
        if (p_resource_file === '') {
            Logger.logWarn('Le chemin de la ressource est vide.');
            return false;
        }

        const filename = Tools.joinPath(this.m_dirname, p_resource_file);

        if (!Tools.existsFile(filename)) {
            Logger.logWarn(`Le chemin de la ressource est introuvable.|url=${p_resource_file}`);
            return false;
        }

        p_filename.value = filename;
        return true;
    }

    private loadMimeType(p_extension: string): string {
        let mime_type: string;
        try {
            const mime_type_factory = new MimeTypeFactory(p_extension);
            mime_type = mime_type_factory.getMimeType().getMimeType();
        } catch {
            mime_type = mime.lookup(p_extension) || 'application/octet-stream';
        }
        return mime_type;
    }

    public getExtension(): string {
        return this.m_extension;
    }

    public getMimeType(): string {
        return this.m_mime_type;
    }

    public getContentType(): string {
        return `${this.m_mime_type}; charset=utf-8`;
    }

    public getContentLength(): number {
        return this.m_data.length;
    }

    public getContentText(): string {
        return this.m_data.toString();
    }

    public getData(): Buffer {
        return this.m_data;
    }
}
