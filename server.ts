import express, { Express } from "express";
import { StartUpConfig, StartUpParse } from "./src/database/config/utils/start-up-parse";
import { Driver } from "./src/database/config/db/driver";
import { PostgresDriver } from "./src/database/config/db/impls/postgres-driver";
import { TransactionRunner } from "./src/database/transaction-runners/transaction-runner";
import { QueryConstructor } from "./src/database/query-constructors/query-constructor";
import { PostgresTransactionRunner } from "./src/database/transaction-runners/impls/postgres-transaction-runner";
import { MigrationRunner } from "./src/database/migration-runner/migration-runner";
import { StudentQueries } from "./src/repositories/queries/student-queries";
import { StudentQueriesPg } from "./src/repositories/queries/impls/student-queries-pg";
import { StudentRepository } from "./src/repositories/student-repository";
import { StudentRepositoryImpl } from "./src/repositories/impls/student-repository-impl";
import { StudentService } from "./src/services/student-service";
import { StudentServiceImpl } from "./src/services/impls/student-service-impl";
import { StudentController } from "./src/controllers/student-controller";
import { StudentControllerImpl } from "./src/controllers/impls/student-controller-impl";
import { StudentRouter } from "./src/routes/student-router";
import { TeacherQueries } from "./src/repositories/queries/teacher-queries";
import { TeacherRepository } from "./src/repositories/teacher-repository";
import { TeacherService } from "./src/services/teacher-service";
import { TeacherController } from "./src/controllers/teacher-controller";
import { TeacherRouter } from "./src/routes/teacher-router";
import { TeacherControllerImpl } from "./src/controllers/impls/teacher-controller-impl";
import { TeacherServiceImpl } from "./src/services/impls/teacher-service-impl";
import { TeacherRepositoryImpl } from "./src/repositories/impls/teacher-repository-impl";
import { TeacherQueriesPg } from "./src/repositories/queries/impls/teacher-queries-pg";

const StudentsAPIPrefix: string = "/profile/students";
const TeachersAPIPrefix: string = "/profile/teachers";

const app: Express = express();
app.use(express.json());

const startUpConfig: StartUpConfig = StartUpParse.getStartUpConfig();
const PORT: number = startUpConfig.PORT;
const isProd: boolean = startUpConfig.PROD;

const pgDriver: Driver = new PostgresDriver();
const transactionRunner: TransactionRunner<QueryConstructor> = new PostgresTransactionRunner<QueryConstructor>(pgDriver);
const migrationRunner: MigrationRunner = new MigrationRunner(transactionRunner);

migrationRunner.run(isProd);

const studentQueries: StudentQueries = new StudentQueriesPg();
const studentRepository: StudentRepository = new StudentRepositoryImpl(transactionRunner, studentQueries);
const studentService: StudentService = new StudentServiceImpl(studentRepository);
const studentController: StudentController = new StudentControllerImpl(studentService);
const studentRouter: StudentRouter = new StudentRouter(studentController);

studentRouter.setRouter();
app.use(StudentsAPIPrefix, studentRouter.getRouter());

const teacherQueries: TeacherQueries = new TeacherQueriesPg();
const teacherRepository: TeacherRepository = new TeacherRepositoryImpl(transactionRunner, teacherQueries);
const teacherService: TeacherService = new TeacherServiceImpl(teacherRepository);
const teacherController: TeacherController = new TeacherControllerImpl(teacherService);
const teacherRouter: TeacherRouter = new TeacherRouter(teacherController);

teacherRouter.setRouter();
app.use(TeachersAPIPrefix, teacherRouter.getRouter());

app.listen(PORT, (err:Error | void): void => {
  err ? console.log(err) : console.log(`Listening to port ${PORT}`);
});