import { StudyProgramController } from "../study-program-controller";
import { MeetingPlaceService } from "../../services/meeting-place-service";
import { StudyProgramService } from "../../services/study-program-service";
import { NextFunction, Request, Response } from "express";
import { CreateDegreeLevelModel, DegreeLevelModel } from "../../models/degree-level-models";
import { ErrorHandler } from "../../utils/error-handler";
import { CreateStudyProgramModel, StudyProgramModel } from "../../models/study-program-models";
import { ParseHelper } from "../../utils/parse-helper";
import { verifyUser } from "../../middlewares/verify-user";
import { AuthServiceResponse } from "../dtos/auth-service-response";

export class StudyProgramControllerImpl implements StudyProgramController {
  private readonly studyProgramService: StudyProgramService;

  constructor(studyProgramService: StudyProgramService) {
    this.studyProgramService = studyProgramService;
  }

  public createStudyProgram = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

      const createStudyProgramModel: CreateStudyProgramModel = req.body;
      const studyProgramModel: StudyProgramModel = await this.studyProgramService.createStudyProgram(createStudyProgramModel);

      this.setFullAPIResponse(res, studyProgramModel);

    } catch (err: any) {
      ErrorHandler.setError(res, err);
    }
  };

  public getStudyProgramById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
      const studyProgramModel :StudyProgramModel = await this.studyProgramService.getStudyProgramById(id);

      this.setFullAPIResponse(res, studyProgramModel);
    }
    catch (err:any) {
      ErrorHandler.setError(res, err);
    }
  };

  public getAllStudyPrograms = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

      const studyPrograms :Array<StudyProgramModel> = await this.studyProgramService.getAllStudyPrograms();
      this.setManyAPIResponse(res, studyPrograms);
    }
    catch (err:any) {
      ErrorHandler.setError(res, err);
    }
  };

  public editStudyProgram = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

      const studyProgram: StudyProgramModel = req.body;
      const updatedStudyProgram :StudyProgramModel = await this.studyProgramService.editStudyProgram(studyProgram);
      this.setFullAPIResponse(res, updatedStudyProgram);
    }
    catch (err:any) {
      ErrorHandler.setError(res, err);
    }
  };

  public deleteStudyProgram = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
      const studyProgram :StudyProgramModel = await this.studyProgramService.deleteStudyProgram(id);

      this.setFullAPIResponse(res, studyProgram);
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