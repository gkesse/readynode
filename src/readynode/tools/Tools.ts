export class Tools {
    public static removeSpace(p_text: string): string {
        return p_text.trim().replace(/^[ \t]+/gm, '');
    }
}
