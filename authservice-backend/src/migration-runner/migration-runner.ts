import {TransactionRunner} from "../repository/transaction-runners/transaction-runner";
import {resolve} from "path";
import fs from "fs";
import {ErrorHandler} from "../utils/error-handler";
import {QueryConstructor} from "../repository/queries/query-constructor";

export class MigrationRunner {
    private readonly transactionRunner: TransactionRunner;
    private readonly relativeMigrationsPath: string = "resources/migrations";
    private readonly fileEncodingType: BufferEncoding = 'utf-8';

    constructor(transactionRunner: TransactionRunner) {
        this.transactionRunner = transactionRunner;
    }

    public run(isProd: boolean): void {
        if (!isProd) {
            return;
        }

        const files: Array<string> = this.getMigrationFiles(this.relativeMigrationsPath);

        files.forEach((filePath: string): void => {
            this.prepareAndRun(filePath);
        });
    }

    private getMigrationFiles(relativePath: string): Array<string> {

        const absoluteMigrationsPath: string = resolve(relativePath);

        const migrationPaths: Array<string> = fs.readdirSync(absoluteMigrationsPath, {encoding: this.fileEncodingType});

        for (let i: number = 0; i < migrationPaths.length; ++i) {
            migrationPaths[i] = absoluteMigrationsPath + "\\" + migrationPaths[i];
        }

        return migrationPaths;
    }

    private prepareAndRun(filePath: string): void {
        try {

            const queries: Array<QueryConstructor> = this.getQueries(filePath);

            this.transactionRunner.run(queries);

        } catch (err: any) {
            ErrorHandler.throwError(err, "Something went wrong while migrating");
        }
    }

    private getQueries(filePath: string): Array<QueryConstructor> {
        try {
            const fileBody: string = fs.readFileSync(filePath, {encoding: 'utf-8'});

            const preparedQueries: Array<QueryConstructor> = this.prepareQueries(fileBody);

            return preparedQueries;
        } catch (err: any) {
            ErrorHandler.throwError(err, "Something went wrong while parsing migration file");
        }
        return new Array<QueryConstructor>();
    }

    private prepareQueries(fileBody: string): Array<QueryConstructor> {
        const queries: Array<string> = fileBody.replace(/\n|\r/g, '')
                                               .split(';');

        const preparedQueries: Array<QueryConstructor> = new Array<QueryConstructor>();

        for (let i: number = 0; i < queries.length; ++i) {
            if (queries[i] == null || queries[i].length == 0) {
                continue;
            }

            const queryConstructor: QueryConstructor = new QueryConstructor();
            queryConstructor.setQuery(queries[i] + ';')

            preparedQueries.push(queryConstructor);
        }

        return preparedQueries;
    }
}