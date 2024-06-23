import { SingleQueryConstructor } from "../../database/query-constructors/single-query-constructor";

export interface MeetingPlaceQueries {
  createMeetingPlace(id: string, description: string, priority: boolean, teacherId: string, offline: boolean): SingleQueryConstructor;
  getMeetingPlaceById(id: string): SingleQueryConstructor;
  getAllMeetingPlaces(): SingleQueryConstructor;
  getPriorityMeetingPlace(teacherId: string, offline: boolean): SingleQueryConstructor;
  getAllMeetingPlacesByTeacher(teacherId: string, offline: boolean)
  editMeetingPlace(id: string, description: string, priority: boolean, teacherId: string): SingleQueryConstructor;
  deleteMeetingPlace(id: string): SingleQueryConstructor;
}