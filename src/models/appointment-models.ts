export interface AppointmentModel {
  id: string;
  meetingDate: Date;
  place: string;
  additionalInfo: string;
  teacherLogin: string;
}

export interface InputAppointmentModel {
  meetingDate: Date;
  place: string;
  additionalInfo: string;
  teacherLogin: string;
}

export interface AppointmentInfo {
  id: string;
  meetingDate: Date;
  place: string;
  additionalInfo: string;
}


