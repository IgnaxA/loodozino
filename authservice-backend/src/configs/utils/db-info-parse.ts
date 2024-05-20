import {ParseHelper} from "../../utils/parse-helper";

export class DbInfoParse {
    private static readonly dbConfig: DBConfig = {} as DBConfig;

    public static getDBConfig(): DBConfig {
        this.varParse();

        return this.dbConfig;
    }

    private static varParse(): void {

        this.dbConfig.HOST = ParseHelper.parseString(process.env.DB_HOST);

        this.dbConfig.USER = ParseHelper.parseString(process.env.DB_USER);

        this.dbConfig.PASSWORD = ParseHelper.parseString(process.env.DB_PASSWORD);

        this.dbConfig.PORT = ParseHelper.parseNumber(process.env.DB_PORT);

        this.dbConfig.DATABASE_NAME = ParseHelper.parseString(process.env.DB_NAME);
    }
}

export interface DBConfig {
    HOST: string;
    USER: string;
    PASSWORD: string;
    PORT: number;
    DATABASE_NAME: string;
}