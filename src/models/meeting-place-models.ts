export interface MeetingPlaceModel {
  id: string;
  description: string;
  priority: boolean;
  teacherId: string;
  offline: boolean;
}

export interface CreateMeetingPlaceModel {
  description: string;
  priority: boolean;
  teacherId: string;
  offline: boolean;
}