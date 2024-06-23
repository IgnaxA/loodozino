export interface StudentModel {
  login: string;
  fullName: string;
  phoneNumber: string;
  studyProgramId: string;
  degreeLevelId: string;
  course: number;
  admissionYear: number;
  socials: string;
  teacherLogin: string;
}

export interface InputStudentModel {
  fullName: string;
  phoneNumber: string;
  studyProgramId: string;
  degreeLevelId: string;
  course: number;
  admissionYear: number;
  socials: string;
  teacherLogin: string;
}