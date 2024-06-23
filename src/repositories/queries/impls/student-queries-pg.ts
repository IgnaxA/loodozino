import { StudentQueries } from "../student-queries";
import { SingleQueryConstructor } from "../../../database/query-constructors/single-query-constructor";
import { Assert } from "../../../utils/assert";

export class StudentQueriesPg implements StudentQueries {
  private readonly create: string =
    `INSERT INTO "students" (login, full_name, phone_number, study_program_id, degree_level_id, course, admission_year, socials) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`;
  private readonly createByLogin: string =
    `INSERT INTO "students" (login) VALUES ($1) RETURNING *;`;
  private readonly edit: string =
    `UPDATE "students" SET full_name=$2, phone_number=$3, study_program_id=$4, degree_level_id=$5, course=$6, admission_year=$7, socials=$8 WHERE login=$1 RETURNING *;`;
  private readonly delete: string =
    `DELETE FROM "students" WHERE login=$1 RETURNING *;`;
  private readonly getByLogin: string =
    'SELECT * FROM "students" WHERE login=$1 LIMIT 1;';
  private readonly getAll: string =
    'SELECT * FROM "students";';

  public createStudent(login: string, fullName: string, phoneNumber: string, studyProgramId: string, degreeLevelId: string, course: number, admissionYear: number, socials: string): SingleQueryConstructor {
    Assert.notNullOrUndefined(login, "Student login must not be null");

    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(login, fullName, phoneNumber, studyProgramId, degreeLevelId, course, admissionYear, socials);

    queryConstructor.setQuery(this.create);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  };

  public getAllStudents(): SingleQueryConstructor {
    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>();

    queryConstructor.setQuery(this.getAll);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  };

  public editStudent(login: string, fullName: string, phoneNumber: string, studyProgramId: string, degreeLevelId: string, course: number, admissionYear: number, socials: string): SingleQueryConstructor {
    Assert.notNullOrUndefined(login, "Student login must not be null");

    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(login, fullName, phoneNumber, studyProgramId, degreeLevelId, course, admissionYear, socials);

    queryConstructor.setQuery(this.edit);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  };

  public deleteStudent(login: string): SingleQueryConstructor {
    Assert.notNullOrUndefined(login, "Student login must not be null");
    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(login);

    queryConstructor.setQuery(this.delete);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  };

  public getStudentByLogin(login: string): SingleQueryConstructor {
    Assert.notNullOrUndefined(login, "Student login must not be null or undefined");
    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(login);

    queryConstructor.setQuery(this.getByLogin);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  };

  public createStudentByLogin(login: string): SingleQueryConstructor {
    Assert.notNullOrUndefined(login, "Student login must not be null or undefined");
    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(login);

    queryConstructor.setQuery(this.createByLogin);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  }
}