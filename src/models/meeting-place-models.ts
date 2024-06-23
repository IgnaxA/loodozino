export interface MeetingPlaceModel {
  id: string;
  description: string;
  priority: boolean;
  teacherLogin: string;
  offline: boolean;
}

export interface CreateMeetingPlaceModel {
  description: string;
  priority: boolean;
  offline: boolean;
}

export interface EditMeetingPlaceModel {
  id: string;
  description: string;
  priority: boolean;
  offline: boolean;
}