export interface TimetableModel {
  id: string;
  datetime: Date;
  place: string;
  additionalInfo: string;
  teacherLogin: string;
  studentLogin: string;
}

export interface InputTimetableModel {
  datetime: Date;
  place: string;
  additionalInfo: string;
  teacherLogin: string;
  studentLogin: string;
}

