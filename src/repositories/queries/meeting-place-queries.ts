import { SingleQueryConstructor } from "../../database/query-constructors/single-query-constructor";

export interface MeetingPlaceQueries {
  createMeetingPlace(id: string, description: string, priority: boolean, teacherId: string): SingleQueryConstructor;
  getMeetingPlaceById(id: string): SingleQueryConstructor;
  getAllMeetingPlaces(): SingleQueryConstructor;
  getPriorityMeetingPlaceForTeacher(teacherId: string): SingleQueryConstructor;
  getAllMeetingPlacesByTeacher(teacherId: string): SingleQueryConstructor;
  editMeetingPlace(id: string, description: string, priority: boolean, teacherId: string): SingleQueryConstructor;
  deleteMeetingPlace(id: string): SingleQueryConstructor;
}