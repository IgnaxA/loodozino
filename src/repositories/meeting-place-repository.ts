import { CreateMeetingPlaceModel, MeetingPlaceModel } from "../models/meeting-place-models";

export interface MeetingPlaceRepository {
  createMeetingPlace(createMeetingPlaceModel: CreateMeetingPlaceModel): Promise<MeetingPlaceModel>;
  getMeetingPlaceById(id: string): Promise<MeetingPlaceModel>;
  getAllMeetingPlaces(): Promise<Array<MeetingPlaceModel>>;
  getPriorityMeetingPlaceForTeacher(teacherLogin: string, offline: boolean): Promise<MeetingPlaceModel>;
  getAllMeetingPlacesByTeacher(teacherLogin: string, offline: boolean): Promise<Array<MeetingPlaceModel>>;
  editMeetingPlace(meetingPlaceModel: MeetingPlaceModel): Promise<MeetingPlaceModel>;
  deleteMeetingPlace(id: string): Promise<MeetingPlaceModel>;
}