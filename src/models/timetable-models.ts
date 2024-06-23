export interface TimetableModel {
  id: string;
  meetingDate: Date;
  place: string;
  additionalInfo: string;
  teacherLogin: string;
  studentLogin: string;
}

export interface InputTimetableModel {
  meetingDate: Date;
  place: string;
  additionalInfo: string;
  teacherLogin: string;
  studentLogin: string;
}

