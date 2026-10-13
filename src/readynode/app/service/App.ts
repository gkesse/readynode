export default class App {
    private m_args: string[];

    constructor() {
        this.m_args = process.argv.slice(2);
    }

    public run(): void {
        console.log('Application started with arguments:', this.m_args);
    }

    public getArgs(): string[] {
        return this.m_args;
    }
}
