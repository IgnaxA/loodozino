import {QueryConstructor} from "../query-constructors/query-constructor";

export interface TransactionRunner<T extends QueryConstructor> {
  run(queries: Array<T>): Promise<any[]>;
}