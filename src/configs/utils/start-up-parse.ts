import {ParseHelper} from "../../utils/parse-helper";

export class StartUpParse {
    private static readonly startUpConfig: StartUpConfig = {} as StartUpConfig;

    public static getStartUpConfig(): StartUpConfig {
        this.varParse();

        return this.startUpConfig;
    }

    private static varParse(): void {

        this.startUpConfig.PORT = ParseHelper.parseNumber(process.env.PORT);

        this.startUpConfig.PROD = ParseHelper.parseBoolean(process.env.PROD);
    }
}

export interface StartUpConfig {
    PORT: number;
    PROD: boolean;
}