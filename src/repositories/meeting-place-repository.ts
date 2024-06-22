import { MeetingPlaceModel } from "../models/meeting-place-models";

export interface MeetingPlaceRepository {
  createMeetingPlace(meetingPlaceModel: MeetingPlaceModel): Promise<void>;
  getMeetingPlaceById(id: string): Promise<MeetingPlaceModel>;
  getAllMeetingPlaces(): Promise<Array<MeetingPlaceModel>>;
  getPriorityMeetingPlaceForTeacher(teacherId: string): Promise<MeetingPlaceModel>;
  getAllMeetingPlacesByTeacher(teacherId: string): Promise<Array<MeetingPlaceModel>>;
  editMeetingPlace(meetingPlaceModel: MeetingPlaceModel): Promise<MeetingPlaceModel>;
  deleteMeetingPlace(id: string): Promise<MeetingPlaceModel>;
}