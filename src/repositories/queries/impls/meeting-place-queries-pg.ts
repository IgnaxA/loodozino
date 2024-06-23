import { MeetingPlaceQueries } from "../meeting-place-queries";
import { SingleQueryConstructor } from "../../../database/query-constructors/single-query-constructor";
import { Assert } from "../../../utils/assert";

export class MeetingPlaceQueriesPg implements MeetingPlaceQueries {
  private readonly create: string =
    `INSERT INTO "meeting_places" (id, description, priority, teacher_login, offline) VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
  private readonly edit: string =
    `UPDATE "meeting_places" SET description=$2, priority=$3, teacher_login=$4, offline=$5 WHERE id=$1 RETURNING *;`;
  private readonly delete: string =
    `DELETE FROM "meeting_places" WHERE id=$1 RETURNING *;`;
  private readonly getById: string =
    'SELECT * FROM "meeting_places" WHERE id=$1 LIMIT 1;';
  private readonly getAll: string =
    'SELECT * FROM "meeting_places";';
  private readonly getAllByTeacher: string =
    'SELECT * FROM "meeting_places" WHERE teacher_login=$1 AND offline=$2;';
  private readonly getPriorityByTeacher: string =
    'SELECT * FROM "meeting_places" WHERE priority=true AND offline=$2 AND teacher_login=$1;';
  public createMeetingPlace(id: string, description: string, priority: boolean, teacherLogin: string, offline: boolean): SingleQueryConstructor {
    Assert.notNullOrUndefined(id,"Meeting place id must not be null");
    Assert.notNullOrUndefined(description,"Meeting place description must not be null");
    Assert.notNullOrUndefined(teacherLogin,"Meeting place teacher login must not be null");

    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(id, description, priority, teacherLogin, offline);

    queryConstructor.setQuery(this.create);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  };

  public getMeetingPlaceById(id: string): SingleQueryConstructor {
    Assert.notNullOrUndefined(id,"Meeting place id must not be null");

    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(id);

    queryConstructor.setQuery(this.getById);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  };

  public getAllMeetingPlaces(): SingleQueryConstructor {
    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>();

    queryConstructor.setQuery(this.getAll);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  };

  public getPriorityMeetingPlace(teacherLogin: string, offline: boolean): SingleQueryConstructor {
    Assert.notNullOrUndefined(teacherLogin,"Meeting place teacherLogin must not be null");

    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(teacherLogin, offline);

    queryConstructor.setQuery(this.getPriorityByTeacher);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  };

  public getAllMeetingPlacesByTeacher(teacherLogin: string, offline: boolean): SingleQueryConstructor {
    Assert.notNullOrUndefined(teacherLogin,"Meeting place teacherId must not be null");

    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(teacherLogin, offline);

    queryConstructor.setQuery(this.getAllByTeacher);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  };

  public editMeetingPlace(id: string, description: string, priority: boolean, teacherLogin: string, offline: boolean): SingleQueryConstructor {
    Assert.notNullOrUndefined(id,"Meeting place id must not be null");
    Assert.notNullOrUndefined(description,"Meeting place description must not be null");
    Assert.notNullOrUndefined(teacherLogin,"Meeting place teacher login must not be null");

    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(id, description, priority, teacherLogin, offline);

    queryConstructor.setQuery(this.edit);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  };

  public deleteMeetingPlace(id: string): SingleQueryConstructor {
    Assert.notNullOrUndefined(id,"Meeting place id must not be null");

    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(id);

    queryConstructor.setQuery(this.delete);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  };
}