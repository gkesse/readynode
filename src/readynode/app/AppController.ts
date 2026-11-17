import { Exception } from '@readynode/exception/Exception';
import ModuleFactory, { Module } from '@readynode/module/ModuleFactory';

export default class AppController {
    private readonly m_module: Module = new Module();

    constructor();
    constructor(p_args: string[]);

    constructor(p_args?: string[]) {
        const args = p_args ?? process.argv.slice(2);
        if (args.length <= 0) {
            throw new Exception("Le nombre d'arguments est incorrect.");
        }
        const module_name = args[0];
        const module_factory = new ModuleFactory(module_name, args.slice(1));
        this.m_module = module_factory.getModule();
    }

    public run(): void {
        this.m_module.onCreate()().run();
    }
}
