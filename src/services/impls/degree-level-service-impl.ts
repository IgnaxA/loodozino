import { DegreeLevelService } from "../degree-level-service";
import { DegreeLevelRepository } from "../../repositories/degree-level-repository";
import { CreateDegreeLevelModel, DegreeLevelModel } from "../../models/degree-level-models";
import { Assert } from "../../utils/assert";
import { ErrorHandler } from "../../utils/error-handler";

export class DegreeLevelServiceImpl implements DegreeLevelService {
  private readonly degreeLevelRepository: DegreeLevelRepository;

  constructor(degreeLevelRepository: DegreeLevelRepository) {
    this.degreeLevelRepository = degreeLevelRepository;
  }

  public async createDegreeLevel(createDegreeLevelModel:CreateDegreeLevelModel): Promise<DegreeLevelModel> {
    try {
      const degreeLevelModel: DegreeLevelModel = await this.degreeLevelRepository.createDegreeLevel(createDegreeLevelModel);
      Assert.notNullOrUndefined(degreeLevelModel, `Degree level could not be created`);
      return degreeLevelModel;
    } catch (err: any) {
      ErrorHandler.throwError(err, "Error when create degree level");
    }
  };

  public async getDegreeLevelById(id: string): Promise<DegreeLevelModel> {
    try {
      const degreeLevel: DegreeLevelModel = await this.degreeLevelRepository.getDegreeLevelById(id);
      Assert.notNullOrUndefined(degreeLevel, `Degree level with ID ${id} not found`);
      return degreeLevel;
    } catch (err: any) {
      ErrorHandler.throwError(err, "Error when create degree level");
    }
  };

  public async getAllDegreeLevels(): Promise<Array<DegreeLevelModel>> {
    try {
      const degreeLevels: Array<DegreeLevelModel> = await this.degreeLevelRepository.getAllDegreeLevels();
      Assert.notNullOrUndefined(degreeLevels, `There are no degree levels yet`);
      return degreeLevels;
    } catch (err: any) {
      ErrorHandler.throwError(err, "Error when create degree level");
    }
  };

  public async editDegreeLevel(degreeLevelModel: DegreeLevelModel): Promise<DegreeLevelModel> {
    try {
      const updatedDegreeLevel: DegreeLevelModel = await this.degreeLevelRepository.editDegreeLevel(degreeLevelModel);
      Assert.notNullOrUndefined(updatedDegreeLevel, `Degree level with ID ${degreeLevelModel.id} not found`);
      return updatedDegreeLevel;
    } catch (err: any) {
      ErrorHandler.throwError(err, "Error when create degree level");
    }
  };

  public async deleteDegreeLevel(id: string): Promise<DegreeLevelModel> {
    try {
      const degreeLevelModel: DegreeLevelModel = await this.degreeLevelRepository.deleteDegreeLevel(id);
      Assert.notNullOrUndefined(degreeLevelModel,`Degree level with ID ${id} not found`);
      return degreeLevelModel;
    } catch (err: any) {
      ErrorHandler.throwError(err, "Error when create degree level");
    }
  };
}