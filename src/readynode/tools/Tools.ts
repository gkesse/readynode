import { Exception } from '@readynode/exception/Exception';
import fs from 'fs';
import path from 'path';

import { basename, dirname, extname } from 'path';
export class Tools {
    // [texte]
    public static isNumber(p_string: string): boolean {
        return /^-?\d+$/.test(p_string);
    }

    public static removeSpace(p_text: string): string {
        return p_text.trim().replace(/^[ \t]+/gm, '');
    }

    public static toBuffer(p_text: string): Buffer {
        return Buffer.from(p_text, 'utf8');
    }

    // [path]
    public static joinPath(...p_paths: string[]): string {
        return path.join(...p_paths);
    }

    // [repertoire]
    public static existsDir(p_dir: string): boolean {
        if (!fs.existsSync(p_dir)) return false;
        const stats = fs.statSync(p_dir);
        return stats.isDirectory();
    }

    public static createDir(p_dir: string): void {
        if (this.existsDir(p_dir)) {
            throw new Exception('Le repertoire existe deja sur le disque.');
        }
        fs.mkdirSync(p_dir, { recursive: true });
    }

    public static removeDir(p_dir: string): void {
        if (!this.existsDir(p_dir)) {
            throw new Exception("Le repertoire n'existe pas sur le disque.");
        }
        fs.rmSync(p_dir, { recursive: true, force: true });
    }

    // [fichier]
    public static getDirname(p_file: string): string {
        return dirname(p_file);
    }

    public static getFilename(p_file: string): string {
        return basename(p_file);
    }

    public static getExtension(p_file: string): string {
        return extname(p_file);
    }

    public static existsFile(p_file: string): boolean {
        if (!fs.existsSync(p_file)) return false;
        const stats = fs.statSync(p_file);
        return stats.isFile();
    }

    public static createFile(p_file: string): void {
        if (this.existsFile(p_file)) {
            throw new Exception('Le fichier existe deja sur le disque.');
        }
        if (!this.existsDir(this.getDirname(p_file))) {
            this.createDir(this.getDirname(p_file));
        }
        fs.writeFileSync(p_file, '');
    }

    public static writeFile(p_file: string, p_text: string): void {
        if (!this.existsFile(p_file)) {
            throw new Exception("Le fichier n'existe pas sur le disque.");
        }
        fs.writeFileSync(p_file, p_text, 'utf8');
    }

    public static readFile(p_file: string): string {
        if (!this.existsFile(p_file)) {
            throw new Exception("Le fichier n'existe pas sur le disque.");
        }
        return fs.readFileSync(p_file, 'utf8');
    }

    public static addFile(p_file: string, p_text: string): void {
        if (!this.existsFile(p_file)) {
            throw new Exception("Le fichier n'existe pas sur le disque.");
        }
        fs.appendFileSync(p_file, p_text, 'utf8');
    }

    public static removeFile(p_file: string): void {
        if (!this.existsFile(p_file)) {
            throw new Exception("Le fichier n'existe pas sur le disque.");
        }
        fs.unlinkSync(p_file);
    }

    // [binaire]
    public static writeBinary(p_file: string, p_buffer: Buffer): void {
        if (!this.existsFile(p_file)) {
            throw new Exception("Le fichier n'existe pas sur le disque.");
        }
        fs.writeFileSync(p_file, p_buffer);
    }

    public static readBinary(p_file: string): Buffer {
        if (!this.existsFile(p_file)) {
            throw new Exception("Le fichier n'existe pas sur le disque.");
        }
        return fs.readFileSync(p_file);
    }
}
