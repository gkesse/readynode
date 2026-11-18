import ResourcePath from '@readynode/server/ResourcePath';

describe('TestResourcePath', () => {
    it('Test_Resource_Path_Par_Defaut', () => {
        const resource_path = new ResourcePath();
        expect(resource_path.getCode()).toBe('readydev');
        expect(resource_path.getPath()).toBe('home');
        expect(resource_path.getMethod()).toBe('GET');
        expect(resource_path.getUrl()).toBe('');
        expect(resource_path.getUrlPath()).toBe('readydev/home');
    });

    it('Test_Ressource_Methode_Vide', () => {
        const DEF_MSG_EXCEPTION = 'La methode de la ressource est vide.';

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        expect(() => {
            new ResourcePath('', 'HOST_RESOURCE', 'URL_RESOURCE');
        }).toThrow(DEF_MSG_EXCEPTION);

        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_EXCEPTION));
        logSpy.mockRestore();
    });

    it('Test_Ressource_Nom_Serveur_Vide', () => {
        const DEF_MSG_EXCEPTION = 'Le nom du serveur de la ressource est vide.';

        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        expect(() => {
            new ResourcePath('METHOD_RESOURCE', '', 'URL_RESOURCE');
        }).toThrow(DEF_MSG_EXCEPTION);

        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(DEF_MSG_EXCEPTION));
        logSpy.mockRestore();
    });

    it('Test_Ressource_Url_Format', () => {
        interface Result {
            m_code: string;
            m_path: string;
            m_method_path: string;
            m_url_path: string;
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
                m_result: {
                    m_code: 'readydev',
                    m_path: 'home',
                    m_method_path: 'METHOD_RESOURCE:readydev/home',
                    m_url_path: 'readydev/home'
                }
            },
            {
                m_method: 'METHOD_RESOURCE',
                m_host: 'HOST_RESOURCE',
                m_url: '/',
                m_result: {
                    m_code: 'readydev',
                    m_path: 'home',
                    m_method_path: 'METHOD_RESOURCE:readydev/home',
                    m_url_path: 'readydev/home'
                }
            },
            {
                m_method: 'METHOD_RESOURCE',
                m_host: 'HOST_RESOURCE',
                m_url: 'CODE_RESOURCE',
                m_result: {
                    m_code: 'CODE_RESOURCE',
                    m_path: 'home',
                    m_method_path: 'METHOD_RESOURCE:CODE_RESOURCE/home',
                    m_url_path: 'CODE_RESOURCE/home'
                }
            },
            {
                m_method: 'METHOD_RESOURCE',
                m_host: 'HOST_RESOURCE',
                m_url: 'CODE_RESOURCE/',
                m_result: {
                    m_code: 'CODE_RESOURCE',
                    m_path: 'home',
                    m_method_path: 'METHOD_RESOURCE:CODE_RESOURCE/home',
                    m_url_path: 'CODE_RESOURCE/home'
                }
            },
            {
                m_method: 'METHOD_RESOURCE',
                m_host: 'HOST_RESOURCE',
                m_url: '/CODE_RESOURCE',
                m_result: {
                    m_code: 'CODE_RESOURCE',
                    m_path: 'home',
                    m_method_path: 'METHOD_RESOURCE:CODE_RESOURCE/home',
                    m_url_path: 'CODE_RESOURCE/home'
                }
            },
            {
                m_method: 'METHOD_RESOURCE',
                m_host: 'HOST_RESOURCE',
                m_url: '/CODE_RESOURCE/',
                m_result: {
                    m_code: 'CODE_RESOURCE',
                    m_path: 'home',
                    m_method_path: 'METHOD_RESOURCE:CODE_RESOURCE/home',
                    m_url_path: 'CODE_RESOURCE/home'
                }
            },
            {
                m_method: 'METHOD_RESOURCE',
                m_host: 'HOST_RESOURCE',
                m_url: 'CODE_RESOURCE/PATH_RESOURCE',
                m_result: {
                    m_code: 'CODE_RESOURCE',
                    m_path: 'PATH_RESOURCE',
                    m_method_path: 'METHOD_RESOURCE:CODE_RESOURCE/PATH_RESOURCE',
                    m_url_path: 'CODE_RESOURCE/PATH_RESOURCE'
                }
            },
            {
                m_method: 'METHOD_RESOURCE',
                m_host: 'HOST_RESOURCE',
                m_url: 'CODE_RESOURCE/PATH_RESOURCE/',
                m_result: {
                    m_code: 'CODE_RESOURCE',
                    m_path: 'PATH_RESOURCE',
                    m_method_path: 'METHOD_RESOURCE:CODE_RESOURCE/PATH_RESOURCE',
                    m_url_path: 'CODE_RESOURCE/PATH_RESOURCE'
                }
            },
            {
                m_method: 'METHOD_RESOURCE',
                m_host: 'HOST_RESOURCE',
                m_url: '/CODE_RESOURCE/PATH_RESOURCE',
                m_result: {
                    m_code: 'CODE_RESOURCE',
                    m_path: 'PATH_RESOURCE',
                    m_method_path: 'METHOD_RESOURCE:CODE_RESOURCE/PATH_RESOURCE',
                    m_url_path: 'CODE_RESOURCE/PATH_RESOURCE'
                }
            },
            {
                m_method: 'METHOD_RESOURCE',
                m_host: 'HOST_RESOURCE',
                m_url: '/CODE_RESOURCE/PATH_RESOURCE/',
                m_result: {
                    m_code: 'CODE_RESOURCE',
                    m_path: 'PATH_RESOURCE',
                    m_method_path: 'METHOD_RESOURCE:CODE_RESOURCE/PATH_RESOURCE',
                    m_url_path: 'CODE_RESOURCE/PATH_RESOURCE'
                }
            }
        ];

        for (const param of params) {
            const resource_path = new ResourcePath(param.m_method, param.m_host, param.m_url);
            expect(resource_path.getCode()).toBe(param.m_result.m_code);
            expect(resource_path.getPath()).toBe(param.m_result.m_path);
            expect(resource_path.getMethod()).toBe(param.m_method);
            expect(resource_path.getHost()).toBe(param.m_host);
            expect(resource_path.getUrl()).toBe(param.m_url);
            expect(resource_path.getUrlPath()).toBe(param.m_result.m_url_path);
        }
    });
});
