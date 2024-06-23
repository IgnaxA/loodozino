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
    private callbackError: Error | null = null;

    constructor(driver: Driver) {
        this.pool = driver.getDriver();
    }

    public run(queries: Array<T>): void {
        this.callbackError = null;
        this.pool.connect((err: Error | undefined, client: PoolClient | undefined): void => {
            if (err != undefined) {
                throw err;
            }

            Assert.notNullOrUndefined(client, "Cant get pg client");

            client?.query(this.start);

            queries.forEach((queryConstructor: T): void => {
                client?.query(queryConstructor.getQuery(), queryConstructor.getParameters())
                    .catch((err: any): void => {
                        client?.query(this.rollback);
                        this.callbackError = new Error("Migration failed");
                });
            });

            client?.query(this.end);

        });

        if (this.callbackError !== null) {
            throw this.callbackError;
        }

    }

    public async runSingle<V>(query: QueryConstructor): Promise<V> {
        try {
            const response: V = (await this.pool.query(query.getQuery(), query.getParameters())).rows[0] as V;

            return response;
        } catch (err: any) {
            ErrorHandler.throwError(err, "Something went wrong while query execution");
        }
        return {} as V;
    }
}