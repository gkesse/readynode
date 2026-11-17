import ServerResponseData from '@readynode/server/ServerResponseData';

describe('TestServerResponseData', () => {
    it('Test_Server_Response_Data_Par_Defaut', () => {
        const server_response_data = new ServerResponseData();
        const response_data = server_response_data.getResponseData();
        expect(response_data.getStatusCode()).toBe(404);
        expect(response_data.getContentType()).toBe('application/json; charset=utf-8');
        expect(response_data.getResponseText()).toBe(
            JSON.stringify({
                status: 'error',
                message: 'La ressource est introuvable.'
            })
        );
    });

    it('Test_Server_Response_Data_Json', () => {
        const onCallback = (_p_res: ServerResponseData) => {
            const response_data = server_response_data.getResponseData();
            response_data.setJson(
                200,
                JSON.stringify({
                    status: 'succes',
                    message: 'Ceci est un message de test.'
                })
            );
        };

        const server_response_data = new ServerResponseData();
        onCallback(server_response_data);
        const response_data = server_response_data.getResponseData();
        expect(response_data.getStatusCode()).toBe(200);
        expect(response_data.getContentType()).toBe('application/json; charset=utf-8');
        expect(response_data.getResponseText()).toBe(
            JSON.stringify({
                status: 'succes',
                message: 'Ceci est un message de test.'
            })
        );
    });

    it('Test_Server_Response_Data_Html', () => {
        const onCallback = (_p_res: ServerResponseData) => {
            const response_data = server_response_data.getResponseData();
            response_data.setHtml(200, '<p>Ceci est un message de test.</p>');
        };

        const server_response_data = new ServerResponseData();
        onCallback(server_response_data);
        const response_data = server_response_data.getResponseData();
        expect(response_data.getStatusCode()).toBe(200);
        expect(response_data.getContentType()).toBe('text/html; charset=utf-8');
        expect(response_data.getResponseText()).toBe('<p>Ceci est un message de test.</p>');
    });
});
