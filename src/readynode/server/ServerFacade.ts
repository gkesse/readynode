import ServerController from './ServerController';

export default class ServerFacade {
    public static onRunServer(p_args: string[]) {
        const server_controller = new ServerController(p_args);
        server_controller.start();
    }
}
