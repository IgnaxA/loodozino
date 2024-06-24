import { DegreeLevelController } from "../degree-level-controller";
import { ErrorHandler } from "../../utils/error-handler";
import { CreateDegreeLevelModel, DegreeLevelModel } from "../../models/degree-level-models";
import { NextFunction, Request, Response } from "express";
import { DegreeLevelService } from "../../services/degree-level-service";
import { ParseHelper } from "../../utils/parse-helper";
import { verifyUser } from "../../middlewares/verify-user";
import { AuthServiceResponse } from "../dtos/auth-service-response";

export class DegreeLevelControllerImpl implements DegreeLevelController {
  private readonly degreeLevelService: DegreeLevelService;

  constructor(degreeLevelService: DegreeLevelService) {
    this.degreeLevelService = degreeLevelService;
  }
  public createDegreeLevel = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authStatus: AuthServiceResponse = res.locals.authData;

      if (authStatus.isTokenExpired) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      if (authStatus.accessLevel !== 0) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      const createDegreeLevelModel: CreateDegreeLevelModel = req.body;
      const degreeLevelModel: DegreeLevelModel = await this.degreeLevelService.createDegreeLevel(createDegreeLevelModel);

      this.setFullAPIResponse(res, degreeLevelModel);

    } catch (err: any) {
      ErrorHandler.setError(res, err);
    }
  };

  public getDegreeLevelById = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authStatus: AuthServiceResponse = res.locals.authData;

      if (authStatus.isTokenExpired) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      if (authStatus.accessLevel !== 0) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      const id: string = req.body.id;
      const degreeLevelModel :DegreeLevelModel = await this.degreeLevelService.getDegreeLevelById(id);

      this.setFullAPIResponse(res, degreeLevelModel);
    }
    catch (err:any) {
      ErrorHandler.setError(res, err);
    }
  };

  public getAllDegreeLevels = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authStatus: AuthServiceResponse = res.locals.authData;

      if (authStatus.isTokenExpired) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      if (authStatus.accessLevel !== 0 && authStatus.accessLevel !== 2) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      const degreeLevels :Array<DegreeLevelModel> = await this.degreeLevelService.getAllDegreeLevels();
      this.setManyAPIResponse(res, degreeLevels);
    }
    catch (err:any) {
      ErrorHandler.setError(res, err);
    }
  };

  public editDegreeLevel = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authStatus: AuthServiceResponse = res.locals.authData;

      if (authStatus.isTokenExpired) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      if (authStatus.accessLevel !== 0) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      const degreeLevel: DegreeLevelModel = req.body;
      const updatedDegreeLevel :DegreeLevelModel = await this.degreeLevelService.editDegreeLevel(degreeLevel);
      this.setFullAPIResponse(res, updatedDegreeLevel);
    }
    catch (err:any) {
      ErrorHandler.setError(res, err);
    }
  };

  public deleteDegreeLevel = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authStatus: AuthServiceResponse = res.locals.authData;

      if (authStatus.isTokenExpired) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      if (authStatus.accessLevel !== 0) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      const id: string = req.body.id;
      const degreeLevel: DegreeLevelModel = await this.degreeLevelService.deleteDegreeLevel(id);

      this.setFullAPIResponse(res, degreeLevel);
    }
    catch (err:any) {
      ErrorHandler.setError(res, err);
    }
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
  private setUnableToAccessAPIResponse (res: Response): void {
    res
      .status(403)
      .json();
  }
}