import ResourcePath from '@readynode/server/ResourcePath';
import ServerResponseData from '@readynode/server/ServerResponseData';
import HomeController from '@readynode/server/web/controller/readydev/home/HomeController';
import { Tools } from '@readynode/tools/Tools';

describe('TestServerReadydevHomeController', () => {
    it('Test_Page_Title', () => {
        interface Result {
            m_page_title: string;
        }

        interface Param {
            m_title: string;
            m_result: Result;
        }

        const params: Param[] = [
            {
                m_title: '',
                m_result: { m_page_title: 'ReadyDEV' }
            },
            {
                m_title: 'PAGE_TITLE',
                m_result: { m_page_title: 'ReadyDEV | PAGE_TITLE' }
            }
        ];

        const server_response_data = new ServerResponseData();

        for (const param of params) {
            const home_controller = new HomeController(server_response_data);
            expect(home_controller.getPageTitle(param.m_title)).toBe(param.m_result.m_page_title);
        }
    });

    it('Test_Page_Url', () => {
        interface Result {
            m_page_url: string;
        }

        interface Param {
            m_method: string;
            m_host: string;
            m_url: string;
            m_result: Result;
        }

        const params: Param[] = [
            {
                m_method: 'METHOD_RESOURCE',
                m_host: 'HOST_RESOURCE',
                m_url: '',
                m_result: { m_page_url: 'http://HOST_RESOURCE' }
            },
            {
                m_method: 'METHOD_RESOURCE',
                m_host: 'HOST_RESOURCE',
                m_url: '/',
                m_result: { m_page_url: 'http://HOST_RESOURCE/' }
            },
            {
                m_method: 'METHOD_RESOURCE',
                m_host: 'HOST_RESOURCE',
                m_url: 'URL_RESOURCE',
                m_result: { m_page_url: 'http://HOST_RESOURCE/URL_RESOURCE' }
            },
            {
                m_method: 'METHOD_RESOURCE',
                m_host: 'HOST_RESOURCE',
                m_url: 'URL_RESOURCE/',
                m_result: { m_page_url: 'http://HOST_RESOURCE/URL_RESOURCE/' }
            },
            {
                m_method: 'METHOD_RESOURCE',
                m_host: 'HOST_RESOURCE',
                m_url: '/URL_RESOURCE',
                m_result: { m_page_url: 'http://HOST_RESOURCE/URL_RESOURCE' }
            },
            {
                m_method: 'METHOD_RESOURCE',
                m_host: 'HOST_RESOURCE',
                m_url: '/URL_RESOURCE/',
                m_result: { m_page_url: 'http://HOST_RESOURCE/URL_RESOURCE/' }
            }
        ];

        for (const param of params) {
            const resource_path = new ResourcePath(param.m_method, param.m_host, param.m_url);
            const server_response_data = new ServerResponseData(resource_path);

            const home_controller = new HomeController(server_response_data);
            expect(home_controller.getPageUrl()).toBe(param.m_result.m_page_url);
        }
    });

    it('Test_Home_Controller_Creation', () => {
        const resource_path = new ResourcePath('METHOD_RESOURCE', 'HOST_RESOURCE', 'URL_RESOURCE');
        const server_response_data = new ServerResponseData(resource_path);
        const home_controller = new HomeController(server_response_data);
        expect(home_controller.getSiteName()).toBe('ReadyDEV');
        expect(home_controller.getPageTitle('PAGE_TTLE')).toBe('ReadyDEV | PAGE_TTLE');
        expect(home_controller.getPageLanguage()).toBe('fr_FR');
        expect(home_controller.getPageEncoding()).toBe('UTF-8');
        expect(home_controller.getPageLogoMimeType()).toBe('image/png');
        expect(home_controller.getPageLogo()).toBe('/public/readydev/data/img/logo.png');
        expect(home_controller.getPageDescription()).toBe(
            Tools.removeSpace(`
                Avec ReadyDEV, apprenez en pratiquant grâce à des cours
                et tutoriels adaptés aux sciences de l'Ingénieur.
                ReadyDEV est une Plateforme de Développement en Continu.
                Produit par Gérard KESSE.
                `)
        );
        expect(home_controller.getPageUrl()).toBe('http://HOST_RESOURCE/URL_RESOURCE');
        expect(home_controller.getOpenGraphType()).toBe('website');
        expect(home_controller.getResourceRoot()).toBe(
            'https://raw.githubusercontent.com/gkesse/readynode/refs/heads/main/src/readynode/server/web/public'
        );
        expect(home_controller.getOpenGraphImage()).toBe(
            `${home_controller.getResourceRoot()}/public/readydev/data/img/banner.png`
        );
        expect(home_controller.getOpenGraphImageMimeType()).toBe('image/png');
        expect(home_controller.getOpenGraphImageWidth()).toBe(440);
        expect(home_controller.getOpenGraphImageHeight()).toBe(440);
        expect(home_controller.getOpenGraphLocale()).toBe('fr_FR');
        expect(home_controller.getPageId()).toBe('');
        expect(home_controller.getViewCount()).toBe(100);
    });
});
