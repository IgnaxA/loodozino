import { CreateStudyProgramModel, StudyProgramModel } from "../models/study-program-models";

export interface StudyProgramService {
  createStudyProgram(createStudyProgramModel: CreateStudyProgramModel): Promise<StudyProgramModel>;
  getStudyProgramById(id: string): Promise<StudyProgramModel>;
  getAllStudyPrograms(): Promise<Array<StudyProgramModel>>;
  editStudyProgram(studyProgramModel: StudyProgramModel): Promise<StudyProgramModel>;
  deleteStudyProgram(id: string): Promise<StudyProgramModel>;
}