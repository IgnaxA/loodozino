export interface StudentModel {
  login: string;
  fullName: string;
  phoneNumber: string;
  studyProgramId: string;
  degreeLevelId: string;
  course: number;
  admissionYear: number;
  socials: string;
}

export interface InputStudentModel {
  fullName: string;
  phoneNumber: string;
  studyProgramId: string;
  degreeLevelId: string;
  course: number;
  admissionYear: number;
  socials: string;
}