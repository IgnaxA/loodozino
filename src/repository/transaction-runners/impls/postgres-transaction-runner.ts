import {Pool, PoolClient} from "pg";
import {PostgresDriver} from "../../../configs/db/impls/postgres-driver";
import {TransactionRunner} from "../transaction-runner";
import {Assert} from "../../../utils/assert";
import {ErrorHandler} from "../../../utils/error-handler";
import {Driver} from "../../../configs/db/driver";
import {QueryConstructor} from "../../query-constructors/query-constructor";


export class PostgresTransactionRunner<T extends QueryConstructor> implements TransactionRunner<T> {
    private readonly pool: Pool;
    private readonly start: string = "BEGIN;";
    private readonly end: string = "COMMIT;";
    private readonly rollback: string = "ROLLBACK;";

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
                client?.query(this.start);

                queries.forEach((queryConstructor: T): void => {
                    client?.query(queryConstructor.getQuery(), queryConstructor.getParameters());
                });

                client?.query(this.end);

            } catch (err: any) {
                client?.query(this.rollback);
                ErrorHandler.throwError(err, "Transaction failed");
            }
        });
    }

    public async runSingle<V>(query: string, parameters: Array<any>): Promise<V> {
        const response: V = (await this.pool.query(query, parameters)).rows as V;

        return response;
    }
}