import { CreateDegreeLevelModel, DegreeLevelModel } from "../models/degree-level-models";

export interface DegreeLevelRepository {
  createDegreeLevel(createDegreeLevelModel: CreateDegreeLevelModel): Promise<DegreeLevelModel>;
  getDegreeLevelById(id: string): Promise<DegreeLevelModel>;
  getAllDegreeLevels(): Promise<Array<DegreeLevelModel>>;
  editDegreeLevel(degreeLevelModel: DegreeLevelModel): Promise<DegreeLevelModel>;
  deleteDegreeLevel(id: string): Promise<DegreeLevelModel>;
}