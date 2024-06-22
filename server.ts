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
import { DegreeLevelQueries } from "./src/repositories/queries/degree-level-queries";
import { DegreeLevelRepository } from "./src/repositories/degree-level-repository";
import { DegreeLevelService } from "./src/services/degree-level-service";
import { DegreeLevelController } from "./src/controllers/degree-level-controller";
import { DegreeLevelRouter } from "./src/routes/degree-level-router";
import { DegreeLevelControllerImpl } from "./src/controllers/impls/degree-level-controller-impl";
import { DegreeLevelServiceImpl } from "./src/services/impls/degree-level-service-impl";
import { DegreeLevelRepositoryImpl } from "./src/repositories/impls/degree-level-repository-impl";
import { DegreeLevelQueriesPg } from "./src/repositories/queries/impls/degree-level-queries-pg";
import { MeetingPlaceQueries } from "./src/repositories/queries/meeting-place-queries";
import { MeetingPlaceRepository } from "./src/repositories/meeting-place-repository";
import { MeetingPlaceController } from "./src/controllers/meeting-place-controller";
import { MeetingPlaceRouter } from "./src/routes/meeting-place-router";
import { MeetingPlaceControllerImpl } from "./src/controllers/impls/meeting-place-controller-impl";
import { MeetingPlaceRepositoryImpl } from "./src/repositories/impls/meeting-place-repository-impl";
import { MeetingPlaceService } from "./src/services/meeting-place-service";
import { MeetingPlaceServiceImpl } from "./src/services/impls/meeting-place-service-impl";
import { MeetingPlaceQueriesPg } from "./src/repositories/queries/impls/meeting-place-queries-pg";
import { StudyProgramQueries } from "./src/repositories/queries/study-program-queries";
import { StudyProgramRepository } from "./src/repositories/study-program-repository";
import { StudyProgramService } from "./src/services/study-program-service";
import { StudyProgramController } from "./src/controllers/study-program-controller";
import { StudyProgramRouter } from "./src/routes/study-program-router";
import { StudyProgramControllerImpl } from "./src/controllers/impls/study-program-controller-impl";
import { StudyProgramQueriesPg } from "./src/repositories/queries/impls/study-program-queries-pg";
import { StudyProgramRepositoryImpl } from "./src/repositories/impls/study-program-repository-impl";
import { StudyProgramServiceImpl } from "./src/services/impls/study-program-service-impl";

const StudentsAPIPrefix: string = "/api/profile/students";
const TeachersAPIPrefix: string = "/api/profile/teachers";
const DegreeLevelsAPIPrefix: string = "/api/profile/degree-levels";
const MeetingPlacesAPIPrefix: string = "/api/profile/meeting-places";
const StudyProgramsAPIPrefix: string = "/api/profile/study-programs";

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

const degreeLevelQueries: DegreeLevelQueries = new DegreeLevelQueriesPg();
const degreeLevelRepository: DegreeLevelRepository = new DegreeLevelRepositoryImpl(transactionRunner, degreeLevelQueries);
const degreeLevelService: DegreeLevelService = new DegreeLevelServiceImpl(degreeLevelRepository);
const degreeLevelController: DegreeLevelController = new DegreeLevelControllerImpl(degreeLevelService);
const degreeLevelRouter: DegreeLevelRouter = new DegreeLevelRouter(degreeLevelController);

degreeLevelRouter.setRouter();
app.use(DegreeLevelsAPIPrefix, degreeLevelRouter.getRouter());

const meetingPlaceQueries: MeetingPlaceQueries = new MeetingPlaceQueriesPg();
const meetingPlaceRepository: MeetingPlaceRepository = new MeetingPlaceRepositoryImpl(transactionRunner, meetingPlaceQueries);
const meetingPlaceService: MeetingPlaceService = new MeetingPlaceServiceImpl(meetingPlaceRepository);
const meetingPlaceController: MeetingPlaceController = new MeetingPlaceControllerImpl(meetingPlaceService);
const meetingPlaceRouter: MeetingPlaceRouter = new MeetingPlaceRouter(meetingPlaceController);

meetingPlaceRouter.setRouter();
app.use(MeetingPlacesAPIPrefix, meetingPlaceRouter.getRouter());

const studyProgramQueries: StudyProgramQueries = new StudyProgramQueriesPg();
const studyProgramRepository: StudyProgramRepository = new StudyProgramRepositoryImpl(transactionRunner, studyProgramQueries);
const studyProgramService: StudyProgramService = new StudyProgramServiceImpl(studyProgramRepository);
const studyProgramController: StudyProgramController = new StudyProgramControllerImpl(studyProgramService);
const studyProgramRouter: StudyProgramRouter = new StudyProgramRouter(studyProgramController);

studyProgramRouter.setRouter();
app.use(StudyProgramsAPIPrefix, studyProgramRouter.getRouter());

app.listen(PORT, (err:Error | void): void => {
  err ? console.log(err) : console.log(`Listening to port ${PORT}`);
});