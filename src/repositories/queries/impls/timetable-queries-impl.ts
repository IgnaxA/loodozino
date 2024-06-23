import { TimetableQueries } from "../timetable-queries";
import { SingleQueryConstructor } from "../../../database/query-constructors/single-query-constructor";
import { Assert } from "../../../utils/assert";

export class TimetableQueriesImpl implements TimetableQueries {
  private readonly create: string =
    `INSERT INTO "timetables" (id, meeting_date, place, additional_info, teacher_login, student_login) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;
  private readonly edit: string =
    `UPDATE "timetables" SET meeting_date=$2, place=$3, additional_info=$4, teacher_login=$5, student_login=$6 WHERE id=$1 RETURNING *;`;
  private readonly delete: string =
    `DELETE FROM "timetables" WHERE id=$1 RETURNING *;`;
  private readonly get: string =
    `SELECT * FROM "timetables" WHERE id=$1;`;
  private readonly getAll: string =
    `SELECT * FROM "timetables"`;
  private readonly getAllByMonthByTeacher: string =
    `SELECT * FROM "timetables" WHERE EXTRACT(MONTH FROM datetime) = $1 AND EXTRACT(YEAR FROM datetime) = $2 AND teacher_login=$3;`;
  private readonly getAllByMonthByStudent: string =
    `SELECT * FROM "timetables" WHERE EXTRACT(MONTH FROM datetime) = $1 AND EXTRACT(YEAR FROM datetime) = $2 AND student_login=$3;`;
  private readonly getAllByTeacher: string =
    `SELECT * FROM "timetables" WHERE teacher_login=$1;`;
  private readonly getAllByStudent: string =
    `SELECT * FROM "timetables" WHERE student_login=$1;`;

  public createTimetable(id: string, meetingDate: Date, place: string, additionalInfo: string, teacherLogin: string, studentLogin: string) : SingleQueryConstructor {
    Assert.notNullOrUndefined(id,"Timetable id must not be null");
    Assert.notNullOrUndefined(meetingDate,"Timetable date must not be null");
    Assert.notNullOrUndefined(place,"Timetable place must not be null");
    Assert.notNullOrUndefined(additionalInfo,"Timetable additionalInfo must not be null");
    Assert.notNullOrUndefined(teacherLogin,"Timetable teacherLogin must not be null");
    Assert.notNullOrUndefined(studentLogin,"Timetable studentLogin must not be null");

    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(id, meetingDate, place, additionalInfo, teacherLogin, studentLogin);

    queryConstructor.setQuery(this.create);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  }

  public editTimetable(id: string, meetingDate: Date, place: string, additionalInfo: string, teacherLogin: string, studentLogin: string) : SingleQueryConstructor {
    Assert.notNullOrUndefined(id,"Timetable id must not be null");
    Assert.notNullOrUndefined(meetingDate,"Timetable date must not be null");
    Assert.notNullOrUndefined(place,"Timetable place must not be null");
    Assert.notNullOrUndefined(additionalInfo,"Timetable additionalInfo must not be null");
    Assert.notNullOrUndefined(teacherLogin,"Timetable teacherLogin must not be null");
    Assert.notNullOrUndefined(studentLogin,"Timetable studentLogin must not be null");

    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(id, meetingDate, place, additionalInfo, teacherLogin, studentLogin);

    queryConstructor.setQuery(this.edit);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  }

  public deleteTimetable(id: string) : SingleQueryConstructor {
    Assert.notNullOrUndefined(id,"Timetable id must not be null");

    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(id);

    queryConstructor.setQuery(this.delete);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  }

  public getTimetableById(id: string): SingleQueryConstructor {
    Assert.notNullOrUndefined(id,"Timetable id must not be null");

    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(id);

    queryConstructor.setQuery(this.get);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  }

  public getAllTimetables() : SingleQueryConstructor {

    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>();

    queryConstructor.setQuery(this.getAll);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  }

  public getAllTimetablesByMonthByTeacher(month: number, year: number, teacherLogin: string) : SingleQueryConstructor {
    Assert.notNullOrUndefined(teacherLogin,"Timetable teacherLogin must not be null");

    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(month, year, teacherLogin);

    queryConstructor.setQuery(this.getAllByMonthByTeacher);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  }

  public getAllTimetablesByMonthByStudent(month: number, year: number, studentLogin: string) : SingleQueryConstructor {
    Assert.notNullOrUndefined(studentLogin,"Timetable studentLogin must not be null");

    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(month, year, studentLogin);

    queryConstructor.setQuery(this.getAllByMonthByStudent);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  }

  public getAllTimetablesByTeacher(teacherLogin: string): SingleQueryConstructor {
    Assert.notNullOrUndefined(teacherLogin,"Timetable teacherLogin must not be null");

    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(teacherLogin);

    queryConstructor.setQuery(this.getAllByTeacher);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  }

  public getAllTimetablesByStudent(studentLogin: string): SingleQueryConstructor {
    Assert.notNullOrUndefined(studentLogin,"Timetable studentLogin must not be null");

    const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

    const parameters: Array<any> = new Array<any>(studentLogin);

    queryConstructor.setQuery(this.getAllByStudent);
    queryConstructor.setParameters(parameters);

    return queryConstructor;
  }
}