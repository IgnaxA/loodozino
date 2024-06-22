import { DegreeLevelModel } from "../models/degree-level-models";

export interface DegreeLevelRepository {
  createDegreeLevel(degreeLevelModel: DegreeLevelModel): Promise<void>;
  getDegreeLevelById(id: string): Promise<DegreeLevelModel>;
  getAllDegreeLevels(): Promise<Array<DegreeLevelModel>>;
  editDegreeLevel(degreeLevelModel: DegreeLevelModel): Promise<DegreeLevelModel>;
  deleteDegreeLevel(id: string): Promise<DegreeLevelModel>;
}