import {Client, Pool, PoolClient} from "pg";
import {TransactionRunner} from "../transaction-runner";
import {Assert} from "../../../utils/assert";
import {Driver} from "../../config/db/driver";
import {QueryConstructor} from "../../query-constructors/query-constructor";

export class PostgresTransactionRunner<T extends QueryConstructor> implements TransactionRunner<T> {
  private readonly pool: Pool;
  private readonly BEGIN:string = "BEGIN;";
  private readonly COMMIT:string = "COMMIT;";
  constructor(driver: Driver) {
    this.pool = driver.getDriver();
  }


  public async run(queries: Array<T>): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.pool.connect((err: Error | undefined, client: PoolClient | undefined): void => {
        if (err != undefined) {
          reject(err);
          return;
        }

        Assert.notNullOrUndefined(client, "Cant get pg client");

        try {
          client?.query("BEGIN;");

          const results: any[] = [];

          (async () => {
            for (const queryConstructor of queries) {
              const result = client?.query(queryConstructor.getQuery(), queryConstructor.getParameters());
              if (result) {
                results.push((await result).rows);
              }
            }

            client?.query("COMMIT;", (commitErr: Error | undefined) => {
              if (commitErr) {
                reject(commitErr);
              } else {
                resolve(results);
              }
            });
          })();

        } catch (err: any) {
          client?.query("ROLLBACK;", (rollbackErr: Error | undefined) => {
            if (rollbackErr) {
              reject(rollbackErr);
            } else {
              reject(err);
            }
          });
        }
      });
    });
  }
}