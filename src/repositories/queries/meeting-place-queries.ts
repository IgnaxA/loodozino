import { SingleQueryConstructor } from "../../database/query-constructors/single-query-constructor";

export interface MeetingPlaceQueries {
  createMeetingPlace(id: string, description: string, priority: boolean, teacherLogin: string, offline: boolean): SingleQueryConstructor;
  getMeetingPlaceById(id: string): SingleQueryConstructor;
  getAllMeetingPlaces(): SingleQueryConstructor;
  getPriorityMeetingPlace(teacherLogin: string, offline: boolean): SingleQueryConstructor;
  getAllMeetingPlacesByTeacher(teacherLogin: string, offline: boolean): SingleQueryConstructor;
  editMeetingPlace(id: string, description: string, priority: boolean, teacherLogin: string, offline: boolean): SingleQueryConstructor;
  deleteMeetingPlace(id: string): SingleQueryConstructor;
}