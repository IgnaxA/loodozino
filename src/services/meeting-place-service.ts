import { CreateMeetingPlaceModel, EditMeetingPlaceModel, MeetingPlaceModel } from "../models/meeting-place-models";

export interface MeetingPlaceService {
  createMeetingPlace(createMeetingPlaceModel: CreateMeetingPlaceModel, teacherLogin: string): Promise<MeetingPlaceModel>;
  getMeetingPlaceById(id: string): Promise<MeetingPlaceModel>;
  getAllMeetingPlaces(): Promise<Array<MeetingPlaceModel>>;
  getPriorityMeetingPlaceForTeacher(teacherLogin: string, offline: boolean): Promise<MeetingPlaceModel>;
  getAllMeetingPlacesByTeacher(teacherLogin: string, offline: boolean): Promise<Array<MeetingPlaceModel>>;
  editMeetingPlace(meetingPlaceModel: EditMeetingPlaceModel, teacherLogin: string): Promise<MeetingPlaceModel>;
  deleteMeetingPlace(id: string): Promise<MeetingPlaceModel>;
}