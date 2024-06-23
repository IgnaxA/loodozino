import { StudyProgramQueries } from "../study-program-queries";
import { SingleQueryConstructor } from "../../../database/query-constructors/single-query-constructor";
import { Assert } from "../../../utils/assert";

export class StudyProgramQueriesPg implements StudyProgramQueries {
  private readonly create: string =
    `INSERT INTO "study_programs" (id, name) VALUES ($1, $2) RETURNING *;`;
  private readonly edit: string =
    `UPDATE "study_programs" SET name=$2 WHERE id=$1 RETURNING *;`;
  private readonly delete: string =
    `DELETE FROM "study_programs" WHERE id=$1 RETURNING *;`;
  private readonly getById: string =
    'SELECT * FROM "study_programs" WHERE id=$1 LIMIT 1;';
  private readonly getAll: string =
    'SELECT * FROM "study_programs";';
  public createStudyProgram(id: string, name: string): SingleQueryConstructor {
    Assert.notNullOrUndefined(id,"Study program id must not be null");
    Assert.notNullOrUndefined(name,"Study program name must not be null");

    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(id, name);

    queryConstructor.setQuery(this.create);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  };

  public getStudyProgramById(id: string): SingleQueryConstructor {
    Assert.notNullOrUndefined(id,"Study program id must not be null");

    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(id);

    queryConstructor.setQuery(this.getById);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  };

  public getAllStudyPrograms(): SingleQueryConstructor {
    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>();

    queryConstructor.setQuery(this.getAll);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  };

  public editStudyProgram(id: string, name: string): SingleQueryConstructor {
    Assert.notNullOrUndefined(id,"Study program id must not be null");
    Assert.notNullOrUndefined(name,"Study program name must not be null");

    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(id,name);

    queryConstructor.setQuery(this.edit);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  };

  public deleteStudyProgram(id: string): SingleQueryConstructor {
    Assert.notNullOrUndefined(id,"Study program id must not be null");

    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(id);

    queryConstructor.setQuery(this.delete);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  };
}