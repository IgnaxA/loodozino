import { StudentQueries } from "../student-queries";
import { SingleQueryConstructor } from "../../../database/query-constructors/single-query-constructor";
import { Assert } from "../../../utils/assert";

export class StudentQueriesPg implements StudentQueries {
  private readonly create: string =
    `INSERT INTO "students" (id, login, full_name, phone_number, study_program_id, degree_level_id, course, admission_year, socials) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`;
  private readonly edit: string =
    `UPDATE "students" SET full_name=$2, phone_number=$3, study_program_id=$4, degree_level_id=$5, course=$6, admission_year=$7, socials=$8 WHERE id=$1 RETURNING *;`;
  private readonly delete: string =
    `DELETE FROM "students" WHERE id=$1 RETURNING *;`;
  private readonly getById: string =
    'SELECT * FROM "students" WHERE id=$1 LIMIT 1;';
  private readonly getAll: string =
    'SELECT * FROM "students";';

  public createStudent(id: string, login: string, fullName: string, phoneNumber: string, studyProgramId: string, degreeLevelId: string, course: number, admissionYear: number, socials: string): SingleQueryConstructor {
    Assert.notNullOrUndefined(id, "Student id must not be null");
    Assert.notNullOrUndefined(login, "Student login must not be null");
    Assert.notNullOrUndefined(fullName, "Student fullName must not be null");
    Assert.notNullOrUndefined(phoneNumber, "Student phoneNumber must not be null");
    Assert.notNullOrUndefined(studyProgramId, "Student studyProgramId must not be null");
    Assert.notNullOrUndefined(degreeLevelId, "Student degreeLevelId must not be null");
    Assert.notNullOrUndefined(socials, "Student socials must not be null");


    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(id, login, fullName, phoneNumber, studyProgramId, degreeLevelId, course, admissionYear, socials);

    queryConstructor.setQuery(this.create);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  };

  public getStudentById(id: string): SingleQueryConstructor {
    Assert.notNullOrUndefined(id, "Student id must not be null");

    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(id);

    queryConstructor.setQuery(this.getById);
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

  public editStudent(id: string, fullName: string, phoneNumber: string, studyProgramId: string, degreeLevelId: string, course: number, admissionYear: number, socials: string): SingleQueryConstructor {
    Assert.notNullOrUndefined(id, "Student id must not be null");
    Assert.notNullOrUndefined(fullName, "Student fullName must not be null");
    Assert.notNullOrUndefined(phoneNumber, "Student phoneNumber must not be null");
    Assert.notNullOrUndefined(studyProgramId, "Student studyProgramId must not be null");
    Assert.notNullOrUndefined(degreeLevelId, "Student degreeLevelId must not be null");
    Assert.notNullOrUndefined(socials, "Student socials must not be null");


    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(id, fullName, phoneNumber, studyProgramId, degreeLevelId, course, admissionYear, socials);

    queryConstructor.setQuery(this.edit);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  };

  public deleteStudent(id: string): SingleQueryConstructor {
    Assert.notNullOrUndefined(id, "Student id must not be null");
    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(id);

    queryConstructor.setQuery(this.delete);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  };
}