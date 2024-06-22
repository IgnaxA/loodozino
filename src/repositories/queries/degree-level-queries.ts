import { SingleQueryConstructor } from "../../database/query-constructors/single-query-constructor";

export interface DegreeLevelQueries {
  createDegreeLevel(id: string, name: string): SingleQueryConstructor;
  getDegreeLevelById(id: string): SingleQueryConstructor;
  getAllDegreeLevels(): SingleQueryConstructor;
  editDegreeLevel(id: string, name: string): SingleQueryConstructor;
  deleteDegreeLevel(id: string): SingleQueryConstructor;
}