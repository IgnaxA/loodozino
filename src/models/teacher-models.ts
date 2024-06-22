export interface TeacherModel {
  id: string;
  login: string;
  fullName: string;
  phoneNumber: string;
  position: string;
  socials: string;
}

export interface EditTeacherModel {
  id: string;
  fullName: string;
  phoneNumber: string;
  position: string;
  socials: string;
}
export interface CreateTeacherModel {
  login: string;
  fullName: string;
  phoneNumber: string;
  position: string;
  socials: string;
}
