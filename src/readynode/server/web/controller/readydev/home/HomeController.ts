import ServerResponseData from '@readynode/server/ServerResponseData';
import { Tools } from '@readynode/tools/Tools';

export default class HomeController {
    private readonly m_res: ServerResponseData;

    constructor(p_res: ServerResponseData) {
        this.m_res = p_res;
    }

    public getSiteName(): string {
        return 'ReadyDEV';
    }

    public getPageTitle(p_title: string = ''): string {
        if (p_title !== '') {
            p_title = ` | ${p_title}`;
        }
        return `${this.getSiteName()}${p_title}`;
    }

    public getPageLanguage(): string {
        return 'fr_FR';
    }

    public getPageEncoding(): string {
        return 'UTF-8';
    }

    public getPageLogoMimeType(): string {
        return 'image/png';
    }

    public getPageLogo(): string {
        return '/readydev/data/img/logo.png';
    }

    public getPageDescription(): string {
        const output_text = Tools.removeSpace(`
        Avec ReadyDEV, apprenez en pratiquant grâce à des cours
        et tutoriels adaptés aux sciences de l'Ingénieur.
        ReadyDEV est une Plateforme de Développement en Continu.
        Produit par Gérard KESSE.
        `);
        return output_text;
    }

    public getPageUrl(): string {
        const protocol = 'http';
        const host = this.m_res.getResourcePath().getHost();
        const url = this.m_res.getResourcePath().getUrl();
        return `${protocol}://${host}${url}`;
    }

    public getOpenGraphType(): string {
        return 'website';
    }

    public getResourceRoot(): string {
        const resource = 'https://raw.githubusercontent.com/gkesse/readynode/refs/heads/main';
        const root = 'src/readynode/server/web/public';
        return `${resource}/${root}`;
    }

    public getOpenGraphImage(): string {
        return `${this.getResourceRoot()}/readydev/data/img/banner.png`;
    }

    public getOpenGraphImageMimeType(): string {
        return 'image/png';
    }

    public getOpenGraphImageWidth(): number {
        return 440;
    }

    public getOpenGraphImageHeight(): number {
        return 440;
    }
    public getOpenGraphLocale(): string {
        return 'fr_FR';
    }

    public getPageId(): string {
        return '';
    }

    public getViewCount(): number {
        return 100;
    }
}
