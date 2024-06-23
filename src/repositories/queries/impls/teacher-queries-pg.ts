import { TeacherQueries } from "../teacher-queries";
import { SingleQueryConstructor } from "../../../database/query-constructors/single-query-constructor";
import { Assert } from "../../../utils/assert";

export class TeacherQueriesPg implements TeacherQueries {
  private readonly create: string =
    `INSERT INTO "teachers" (login, full_name, phone_number, position, socials) VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
  private readonly createByLogin: string =
    `INSERT INTO "teachers" (login) VALUES ($1) RETURNING *;`;
  private readonly edit: string =
    `UPDATE "teachers" SET full_name=$2, phone_number=$3, position=$4, socials=$5 WHERE login=$1 RETURNING *;`;
  private readonly delete: string =
    `DELETE FROM "teachers" WHERE login=$1 RETURNING *;`;
  private readonly getAll: string =
    'SELECT * FROM "teachers";';
  private readonly getByLogin: string =
    'SELECT * FROM "teachers" WHERE login=$1;';
  public createTeacher(login: string, fullName: string, phoneNumber: string, position: string, socials: string): SingleQueryConstructor {
    Assert.notNullOrUndefined(login, "Teacher login must not be null");

    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(login, fullName, phoneNumber, position, socials);

    queryConstructor.setQuery(this.create);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  };

  public getAllTeachers(): SingleQueryConstructor {
    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>();

    queryConstructor.setQuery(this.getAll);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  };

  public editTeacher(login:string, fullName: string, phoneNumber: string, position: string, socials: string): SingleQueryConstructor {
    Assert.notNullOrUndefined(login, "Teacher login must not be null");

    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(login, fullName, phoneNumber, position, socials);

    queryConstructor.setQuery(this.edit);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  };

  public deleteTeacher(login: string): SingleQueryConstructor {
    Assert.notNullOrUndefined(login, "Teacher login must not be null");

    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(login);

    queryConstructor.setQuery(this.delete);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  };

  public getTeacherByLogin(login: string): SingleQueryConstructor {
    Assert.notNullOrUndefined(login, "Teacher login must not be null or undefined");

    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(login);

    queryConstructor.setQuery(this.getByLogin);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  };

  public createTeacherByLogin(login: string): SingleQueryConstructor {
    Assert.notNullOrUndefined(login, "Teacher login must not be null or undefined");

    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(login);

    queryConstructor.setQuery(this.createByLogin);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  };
}