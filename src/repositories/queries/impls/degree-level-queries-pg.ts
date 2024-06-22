import { SingleQueryConstructor } from "../../../database/query-constructors/single-query-constructor";
import { Assert } from "../../../utils/assert";
import { DegreeLevelQueries } from "../degree-level-queries";

export class DegreeLevelQueriesPg implements DegreeLevelQueries {
  private readonly create: string =
    `INSERT INTO "degree_levels" (id, name) VALUES ($1, $2);`;
  private readonly edit: string =
    `UPDATE "degree_levels" SET name=$2 WHERE id=$1 RETURNING *;`;
  private readonly delete: string =
    `DELETE FROM "degree_levels" WHERE id=$1 RETURNING *;`;
  private readonly getById: string =
    'SELECT * FROM "degree_levels" WHERE id=$1 LIMIT 1;';
  private readonly getAll: string =
    'SELECT * FROM "degree_levels";';

  public createDegreeLevel(id: string, name: string): SingleQueryConstructor {
    Assert.notNullOrUndefined(id,"Degree level id must not be null");
    Assert.notNullOrUndefined(name,"Degree level name must not be null");

    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(id, name);

    queryConstructor.setQuery(this.create);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  };

  public getDegreeLevelById(id: string): SingleQueryConstructor {
    Assert.notNullOrUndefined(id,"Degree level id must not be null");

    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(id);

    queryConstructor.setQuery(this.getById);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  };

  public getAllDegreeLevels(): SingleQueryConstructor {
    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>();

    queryConstructor.setQuery(this.getAll);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  };

  public editDegreeLevel(id: string, name: string): SingleQueryConstructor {
    Assert.notNullOrUndefined(id,"Degree level id must not be null");
    Assert.notNullOrUndefined(name,"Degree level name must not be null");

    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(id,name);

    queryConstructor.setQuery(this.edit);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  };

  public deleteDegreeLevel(id: string): SingleQueryConstructor {
    Assert.notNullOrUndefined(id,"Degree level id must not be null");

    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(id);

    queryConstructor.setQuery(this.delete);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  };
}