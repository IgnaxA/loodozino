
export interface TransactionRunner {
    run(queries: Array<string>): void;
}