import { ServerManager } from '@readynode/server/ServerController';
import { IncomingMessage, ServerResponse } from 'http';

describe('TestServerManager', () => {
    it('Test_Server_Manager_Creation', async () => {
        const req = {
            method: 'GET',
            url: '/readydev/home'
        } as IncomingMessage;

        const res = {
            writeHead: jest.fn(),
            end: jest.fn()
        } as unknown as ServerResponse;

        const server_manager = new ServerManager(req, res);
        await server_manager.run();

        expect(res.writeHead).toHaveBeenCalled();
        expect(res.end).toHaveBeenCalled();
    });
});
