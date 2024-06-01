import { ParseHelper } from "./parse-helper";

export class StartUpParse {
    private static readonly startUpConfig: StartUpConfig = {} as StartUpConfig;

    public static getStartUpConfig(): StartUpConfig {
        this.varParse();

        return this.startUpConfig;
    }

    private static varParse(): void {

        this.startUpConfig.PORT = ParseHelper.parseNumber(process.env.PORT);

        this.startUpConfig.PROD = ParseHelper.parseBoolean(process.env.PROD);

        this.startUpConfig.MONGO_URL = ParseHelper.parseString(process.env.MONGO_URL);
    }
}

export interface StartUpConfig {
    PORT: number;
    PROD: boolean;
    MONGO_URL: string;
}

