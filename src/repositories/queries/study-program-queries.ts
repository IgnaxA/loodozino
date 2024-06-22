import { SingleQueryConstructor } from "../../database/query-constructors/single-query-constructor";

export interface StudyProgramQueries {
  createStudyProgram(id: string, name: string): SingleQueryConstructor;
  getStudyProgramById(id: string): SingleQueryConstructor;
  getAllStudyPrograms(): SingleQueryConstructor;
  editStudyProgram(id: string, name: string): SingleQueryConstructor;
  deleteStudyProgram(id: string): SingleQueryConstructor;
}