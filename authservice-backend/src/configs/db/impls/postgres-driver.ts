import {Driver} from "../driver";
import { Pool } from "pg";
import {DBConfig, DbInfoParse} from "../../utils/db-info-parse";

export class PostgresDriver implements Driver {
    private readonly dbConfig: DBConfig;

    constructor() {
        this.dbConfig = DbInfoParse.getDBConfig();
    }

    public getDriver(): Pool {
        const pool: Pool = new Pool({
            user: this.dbConfig.USER,
            password: this.dbConfig.PASSWORD,
            host: this.dbConfig.HOST,
            port: this.dbConfig.PORT,
            database: this.dbConfig.DATABASE_NAME
        });

        return pool;
    }

}