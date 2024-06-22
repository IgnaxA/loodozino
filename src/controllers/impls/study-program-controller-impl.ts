import { StudyProgramController } from "../study-program-controller";
import { MeetingPlaceService } from "../../services/meeting-place-service";
import { StudyProgramService } from "../../services/study-program-service";
import { Request, Response } from "express";
import { CreateDegreeLevelModel, DegreeLevelModel } from "../../models/degree-level-models";
import { ErrorHandler } from "../../utils/error-handler";
import { CreateStudyProgramModel, StudyProgramModel } from "../../models/study-program-models";

export class StudyProgramControllerImpl implements StudyProgramController {
  private readonly studyProgramService: StudyProgramService;

  constructor(studyProgramService: StudyProgramService) {
    this.studyProgramService = studyProgramService;
  }

  public createStudyProgram = async (req: Request, res: Response): Promise<void> => {
    try {
      const studyProgramInput: CreateStudyProgramModel = req.body;
      const studyProgramInputWithGuid: StudyProgramModel = this.createModelWithId(studyProgramInput);
      await this.studyProgramService.createStudyProgram(studyProgramInputWithGuid);

      this.setFullAPIResponse(res, studyProgramInputWithGuid);

    } catch (err: any) {
      ErrorHandler.setError(res, err);
    }
  };

  public getStudyProgramById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id: string = req.body.id;
      const studyProgramModel :StudyProgramModel = await this.studyProgramService.getStudyProgramById(id);

      this.setFullAPIResponse(res, studyProgramModel);
    }
    catch (err:any) {
      ErrorHandler.setError(res, err);
    }
  };

  public getAllStudyPrograms = async (req: Request, res: Response): Promise<void> => {
    try {
      const studyPrograms :Array<StudyProgramModel> = await this.studyProgramService.getAllStudyPrograms();
      this.setManyAPIResponse(res, studyPrograms);
    }
    catch (err:any) {
      ErrorHandler.setError(res, err);
    }
  };

  public editStudyProgram = async (req: Request, res: Response): Promise<void> => {
    try {
      const studyProgram: StudyProgramModel = req.body;
      const updatedStudyProgram :StudyProgramModel = await this.studyProgramService.editStudyProgram(studyProgram);
      this.setFullAPIResponse(res, updatedStudyProgram);
    }
    catch (err:any) {
      ErrorHandler.setError(res, err);
    }
  };

  public deleteStudyProgram = async (req: Request, res: Response): Promise<void> => {
    try {
      const id: string = req.body.id;
      const studyProgram :StudyProgramModel = await this.studyProgramService.deleteStudyProgram(id);

      this.setFullAPIResponse(res, studyProgram);
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