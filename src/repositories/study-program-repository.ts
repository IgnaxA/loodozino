import { SingleQueryConstructor } from "../database/query-constructors/single-query-constructor";
import { StudyProgramModel } from "../models/study-program-models";

export interface StudyProgramRepository {
  createStudyProgram(studyProgramModel: StudyProgramModel): Promise<void>;
  getStudyProgramById(id: string): Promise<StudyProgramModel>;
  getAllStudyPrograms(): Promise<Array<StudyProgramModel>>;
  editStudyProgram(studyProgramModel: StudyProgramModel): Promise<StudyProgramModel>;
  deleteStudyProgram(id: string): Promise<StudyProgramModel>;
}