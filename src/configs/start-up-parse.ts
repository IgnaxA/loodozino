
export class StartUpParse {
    private static readonly startUp: StartUp;

    public static getStartUpConfig(): StartUp {
        this.startUp.PORT = process.env.PORT ? Number(process.env.PORT) : 8080;
        return this.startUp;
    }
}

export interface StartUp {
    PORT: number;
}