import { DegreeLevelController } from "../degree-level-controller";
import { ErrorHandler } from "../../utils/error-handler";
import { CreateDegreeLevelModel, DegreeLevelModel } from "../../models/degree-level-models";
import { Request, Response } from "express";
import { DegreeLevelService } from "../../services/degree-level-service";

export class DegreeLevelControllerImpl implements DegreeLevelController {
  private readonly degreeLevelService: DegreeLevelService;

  constructor(degreeLevelService: DegreeLevelService) {
    this.degreeLevelService = degreeLevelService;
  }
  public createDegreeLevel = async(req: Request, res: Response): Promise<void> => {
    try {
      const degreeLevelInput: CreateDegreeLevelModel = req.body;
      const degreeLevelInputWithGuid: DegreeLevelModel = this.createModelWithId(degreeLevelInput);
      await this.degreeLevelService.createDegreeLevel(degreeLevelInputWithGuid);

      this.setFullAPIResponse(res, degreeLevelInputWithGuid);

    } catch (err: any) {
      ErrorHandler.setError(res, err);
    }
  };

  public getDegreeLevelById = async(req: Request, res: Response): Promise<void> => {
    try {
      const id: string = req.body.id;
      const degreeLevelModel :DegreeLevelModel = await this.degreeLevelService.getDegreeLevelById(id);

      this.setFullAPIResponse(res, degreeLevelModel);
    }
    catch (err:any) {
      ErrorHandler.setError(res, err);
    }
  };

  public getAllDegreeLevels = async(req: Request, res: Response): Promise<void> => {
    try {
      const degreeLevels :Array<DegreeLevelModel> = await this.degreeLevelService.getAllDegreeLevels();
      this.setManyAPIResponse(res, degreeLevels);
    }
    catch (err:any) {
      ErrorHandler.setError(res, err);
    }
  };

  public editDegreeLevel = async(req: Request, res: Response): Promise<void> => {
    try {
      const degreeLevel: DegreeLevelModel = req.body;
      const updatedDegreeLevel :DegreeLevelModel = await this.degreeLevelService.editDegreeLevel(degreeLevel);
      this.setFullAPIResponse(res, updatedDegreeLevel);
    }
    catch (err:any) {
      ErrorHandler.setError(res, err);
    }
  };

  public deleteDegreeLevel = async(req: Request, res: Response): Promise<void> => {
    try {
      const id: string = req.body.id;
      const degreeLevel :DegreeLevelModel = await this.degreeLevelService.deleteDegreeLevel(id);

      this.setFullAPIResponse(res, degreeLevel);
    }
    catch (err:any) {
      ErrorHandler.setError(res, err);
    }
  };

  private createModelWithId (createDegreeLevelModel: CreateDegreeLevelModel): DegreeLevelModel {
    const guid: string = crypto.randomUUID();
    return {
      ...createDegreeLevelModel,
      id: guid,
    };
  };

  private setFullAPIResponse (res: Response, responseData: DegreeLevelModel): void {
    res
      .status(200)
      .json(responseData);
  }

  private setManyAPIResponse (res: Response, responseData: Array<DegreeLevelModel>): void {
    res
      .status(200)
      .json(responseData);
  }
}