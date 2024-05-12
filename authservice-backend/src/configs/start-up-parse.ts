
export class StartUpParse {
    private static readonly startUpConfig: StartUpConfig;

    public static getStartUpConfig(): StartUpConfig {
        this.startUpConfig.PORT = process.env.PORT
            ? Number(process.env.PORT)
            : 8080;

        return this.startUpConfig;
    }
}

export interface StartUpConfig {
    PORT: number;
}