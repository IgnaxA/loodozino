import {TransactionRunner} from "../repository/transaction-runners/transaction-runner";
import {resolve} from "path";
import fs from "fs";
import {ErrorHandler} from "../utils/error-handler";

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

            const queries: Array<string> = this.getQueries(filePath);

            this.transactionRunner.run(queries);

        } catch (err: any) {
            ErrorHandler.throwError(err, "Something went wrong while migrating");
        }
    }

    private getQueries(filePath: string): Array<string> {
        try {
            const fileBody: string = fs.readFileSync(filePath, {encoding: 'utf-8'});

            const preparedQueries: Array<string> = this.prepareQueries(fileBody);

            return preparedQueries;
        } catch (err: any) {
            ErrorHandler.throwError(err, "Something went wrong while parsing migration file");
        }
        return new Array<string>();
    }

    private prepareQueries(fileBody: string): Array<string> {
        const queries: Array<string> = fileBody.replace(/\n|\r/g, '')
                                               .split(';');

        const preparedQueries: Array<string> = new Array<string>();

        for (let i: number = 0; i < queries.length; ++i) {
            if (queries[i] == null || queries[i].length == 0) {
                continue;
            }

            preparedQueries.push(queries[i] + ';');
        }

        return preparedQueries;
    }
}