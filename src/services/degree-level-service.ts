import { DegreeLevelModel } from "../models/degree-level-models";

export interface DegreeLevelService {
  createDegreeLevel(degreeLevelModel: DegreeLevelModel): Promise<DegreeLevelModel>;
  getDegreeLevelById(id: string): Promise<DegreeLevelModel>;
  getAllDegreeLevels(): Promise<Array<DegreeLevelModel>>;
  editDegreeLevel(degreeLevelModel: DegreeLevelModel): Promise<DegreeLevelModel>;
  deleteDegreeLevel(id: string): Promise<DegreeLevelModel>;
}