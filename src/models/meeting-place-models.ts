export interface MeetingPlaceModel {
  id: string;
  description: string;
  priority: boolean;
  teacherId: string;
}

export interface CreateMeetingPlaceModel {
  description: string;
  priority: boolean;
  teacherId: string;
}