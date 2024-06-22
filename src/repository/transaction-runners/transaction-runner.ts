import {QueryConstructor} from "../query-constructors/query-constructor";

export interface TransactionRunner<Z extends QueryConstructor> {
    run(queries: Array<Z>): void;
    runSingle<V>(query: QueryConstructor): Promise<V>;
}