import { StudyProgramModel } from "../models/study-program-models";

export interface StudyProgramService {
  createStudyProgram(studyProgramModel: StudyProgramModel): Promise<StudyProgramModel>;
  getStudyProgramById(id: string): Promise<StudyProgramModel>;
  getAllStudyPrograms(): Promise<Array<StudyProgramModel>>;
  editStudyProgram(studyProgramModel: StudyProgramModel): Promise<StudyProgramModel>;
  deleteStudyProgram(id: string): Promise<StudyProgramModel>;
}