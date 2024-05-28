import {QueryConstructor} from "../queries/query-constructor";

export interface TransactionRunner {
    run(queries: Array<QueryConstructor>): void;
}