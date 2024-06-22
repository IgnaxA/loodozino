import { TeacherQueries } from "../teacher-queries";
import { SingleQueryConstructor } from "../../../database/query-constructors/single-query-constructor";
import { Assert } from "../../../utils/assert";

export class TeacherQueriesPg implements TeacherQueries {
  private readonly create: string =
    `INSERT INTO "teachers" (id, login, full_name, phone_number, position, socials) VALUES ($1, $2, $3, $4, $5, $6);`;
  private readonly edit: string =
    `UPDATE "teachers" SET full_name=$2, phone_number=$3, position=$4, socials=$5 WHERE id=$1 RETURNING *;`;
  private readonly delete: string =
    `DELETE FROM "teachers" WHERE id=$1 RETURNING *;`;
  private readonly getById: string =
    'SELECT * FROM "teachers" WHERE id=$1 LIMIT 1;';
  private readonly getAll: string =
    'SELECT * FROM "teachers";';
  public createTeacher(id: string, login: string, fullName: string, phoneNumber: string, position: string, socials: string): SingleQueryConstructor {
    Assert.notNullOrUndefined(id, "Teacher id must not be null");
    Assert.notNullOrUndefined(login, "Teacher login must not be null");
    Assert.notNullOrUndefined(fullName, "Teacher fullName must not be null");
    Assert.notNullOrUndefined(phoneNumber, "Teacher phoneNumber must not be null");
    Assert.notNullOrUndefined(position, "Teacher position must not be null");
    Assert.notNullOrUndefined(socials, "Teacher socials must not be null");

    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(id, login, fullName, phoneNumber, position, socials);

    queryConstructor.setQuery(this.create);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  };

  public getTeacherById(id: string): SingleQueryConstructor {
    Assert.notNullOrUndefined(id, "Teacher id must not be null");

    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(id);

    queryConstructor.setQuery(this.getById);
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

  public editTeacher(id: string, fullName: string, phoneNumber: string, position: string, socials: string): SingleQueryConstructor {
    Assert.notNullOrUndefined(id, "Teacher id must not be null");
    Assert.notNullOrUndefined(fullName, "Teacher fullName must not be null");
    Assert.notNullOrUndefined(phoneNumber, "Teacher phoneNumber must not be null");
    Assert.notNullOrUndefined(position, "Teacher position must not be null");
    Assert.notNullOrUndefined(socials, "Teacher socials must not be null");

    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(id, fullName, phoneNumber, position, socials);

    queryConstructor.setQuery(this.edit);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  };

  public deleteTeacher(id: string): SingleQueryConstructor {
    Assert.notNullOrUndefined(id, "Teacher id must not be null");

    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(id);

    queryConstructor.setQuery(this.delete);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  };
}