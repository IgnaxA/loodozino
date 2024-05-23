import {Pool, PoolClient} from "pg";
import {PostgresDriver} from "../../../configs/db/impls/postgres-driver";
import {TransactionRunner} from "../transaction-runner";
import {Assert} from "../../../utils/assert";
import {ErrorHandler} from "../../../utils/error-handler";


export class PostgresTransactionRunner implements TransactionRunner {
    private readonly pool: Pool;

    constructor() {
        const postgresDriver: PostgresDriver = new PostgresDriver();
        this.pool = postgresDriver.getDriver();
    }

    public run(queries: Array<string>): void {
        this.pool.connect((err: Error | undefined, client: PoolClient | undefined): void => {
            if (err != undefined) {
                throw err;
            }

            Assert.notNullOrUndefined(client, "Cant get pg client");

            try {
                queries.forEach(async (query: string): Promise<void> => {
                    await client?.query(query);
                });
            } catch (err: any) {
                ErrorHandler.throwError(err, "Transaction failed");
            }

        });
    }
}