import {  TransactionRunner } from "../transaction-runners/transaction-runner";
import {resolve} from "path";
import fs from "fs";
import {ErrorHandler} from "../../utils/error-handler";
import {SingleQueryConstructor} from "../query-constructors/single-query-constructor";
import {QueryConstructor} from "../query-constructors/query-constructor";

export class MigrationRunner {
  private readonly transactionRunner: TransactionRunner<QueryConstructor>;
  private readonly relativeMigrationsPath: string = "src/database/resources/migrations";
  private readonly fileEncodingType: BufferEncoding = 'utf-8';

  constructor(transactionRunner: TransactionRunner<QueryConstructor>) {
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

      const queries: Array<SingleQueryConstructor> = this.getQueries(filePath);

      this.transactionRunner.run(queries);

    } catch (err: any) {
      ErrorHandler.throwError(err, "Something went wrong while migrating");
    }
  }

  private getQueries(filePath: string): Array<SingleQueryConstructor> {
    try {
      const fileBody: string = fs.readFileSync(filePath, {encoding: 'utf-8'});

      const preparedQueries: Array<SingleQueryConstructor> = this.prepareQueries(fileBody);

      return preparedQueries;
    } catch (err: any) {
      ErrorHandler.throwError(err, "Something went wrong while parsing migration file");
    }
    return new Array<SingleQueryConstructor>();
  }

  private prepareQueries(fileBody: string): Array<SingleQueryConstructor> {
    const queries: Array<string> = fileBody.replace(/\n|\r/g, ' ')
      .split(';');

    const preparedQueries: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

    for (let i: number = 0; i < queries.length; ++i) {
      if (queries[i] == null || queries[i].length == 0) {
        continue;
      }

      const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();
      queryConstructor.setQuery(queries[i] + ';')

      preparedQueries.push(queryConstructor);
    }

    return preparedQueries;
  }
}