export interface StudentModel {
  id: string;
  login: string;
  fullName: string;
  phoneNumber: string;
  studyProgramId: string;
  degreeLevelId: string;
  course: number;
  admissionYear: number;
  socials: string;
}

export interface EditStudentModel {
  id: string;
  fullName: string;
  phoneNumber: string;
  studyProgramId: string;
  degreeLevelId: string;
  course: number;
  admissionYear: number;
  socials: string;
}

export interface CreateStudentModel {
  login: string;
  fullName: string;
  phoneNumber: string;
  studyProgramId: string;
  degreeLevelId: string;
  course: number;
  admissionYear: number;
  socials: string;
}