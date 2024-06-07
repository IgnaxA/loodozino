import {Pool, PoolClient} from "pg";
import {PostgresDriver} from "../../../configs/db/impls/postgres-driver";
import {TransactionRunner} from "../transaction-runner";
import {Assert} from "../../../utils/assert";
import {ErrorHandler} from "../../../utils/error-handler";
import {Driver} from "../../../configs/db/driver";
import {QueryConstructor} from "../../query-constructors/query-constructor";


export class PostgresTransactionRunner<T extends QueryConstructor> implements TransactionRunner<T> {
    private readonly pool: Pool;

    constructor(driver: Driver) {
        this.pool = driver.getDriver();
    }

    public run(queries: Array<T>): void {

        this.pool.connect((err: Error | undefined, client: PoolClient | undefined): void => {
            if (err != undefined) {
                throw err;
            }

            Assert.notNullOrUndefined(client, "Cant get pg client");

            try {
                client?.query("BEGIN;");

                queries.forEach((queryConstructor: T): void => {
                    client?.query(queryConstructor.getQuery(), queryConstructor.getParameters());
                });

                client?.query("COMMIT;");

            } catch (err: any) {
                ErrorHandler.throwError(err, "Transaction failed");
            }
        });
    }
}