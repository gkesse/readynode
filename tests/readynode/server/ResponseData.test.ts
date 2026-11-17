import { ResponseData } from '@readynode/server/ServerResponseData';

describe('TestServerResponseDataObj', () => {
    it('Test_Response_Data_Par_Defaut', () => {
        const response_data = new ResponseData();
        expect(response_data.getStatusCode()).toBe(404);
        expect(response_data.getContentType()).toBe('application/json; charset=utf-8');
        expect(response_data.getResponseText()).toBe(
            JSON.stringify({
                status: 'error',
                message: 'La ressource est introuvable.'
            })
        );
    });

    it('Test_Response_Data_Json', () => {
        const response_data = new ResponseData();
        response_data.setJson(
            200,
            JSON.stringify({
                status: 'succes',
                message: 'Ceci est un message de test.'
            })
        );
        expect(response_data.getStatusCode()).toBe(200);
        expect(response_data.getContentType()).toBe('application/json; charset=utf-8');
        expect(response_data.getResponseText()).toBe(
            JSON.stringify({
                status: 'succes',
                message: 'Ceci est un message de test.'
            })
        );
    });

    it('Test_Response_Data_Html', () => {
        const response_data = new ResponseData();
        response_data.setHtml(200, '<p>Ceci est un message de test.</p>');
        expect(response_data.getStatusCode()).toBe(200);
        expect(response_data.getContentType()).toBe('text/html; charset=utf-8');
        expect(response_data.getResponseText()).toBe('<p>Ceci est un message de test.</p>');
    });
});
