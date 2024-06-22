import { MeetingPlaceController } from "../meeting-place-controller";
import { MeetingPlaceService } from "../../services/meeting-place-service";
import { Request, Response } from "express";
import { CreateDegreeLevelModel, DegreeLevelModel } from "../../models/degree-level-models";
import { ErrorHandler } from "../../utils/error-handler";
import { CreateMeetingPlaceModel, MeetingPlaceModel } from "../../models/meeting-place-models";

export class MeetingPlaceControllerImpl implements MeetingPlaceController {
  private readonly meetingPlaceService: MeetingPlaceService;

  constructor(meetingPlaceService: MeetingPlaceService) {
    this.meetingPlaceService = meetingPlaceService;
  }

  public createMeetingPlace = async (req: Request, res: Response): Promise<void> => {
    try {
      const meetingPlaceInput: CreateMeetingPlaceModel = req.body;
      const meetingPlaceInputWithGuid: MeetingPlaceModel = this.createModelWithId(meetingPlaceInput);
      await this.meetingPlaceService.createMeetingPlace(meetingPlaceInputWithGuid);

      this.setFullAPIResponse(res, meetingPlaceInputWithGuid);

    } catch (err: any) {
      ErrorHandler.setError(res, err);
    }
  };

  public getMeetingPlaceById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id: string = req.body.id;
      const meetingPlaceModel :MeetingPlaceModel = await this.meetingPlaceService.getMeetingPlaceById(id);

      this.setFullAPIResponse(res, meetingPlaceModel);
    }
    catch (err:any) {
      ErrorHandler.setError(res, err);
    }
  };

  public getAllMeetingPlaces = async (req: Request, res: Response): Promise<void> => {
    try {
      const meetingPlaces :Array<MeetingPlaceModel> = await this.meetingPlaceService.getAllMeetingPlaces();
      this.setManyAPIResponse(res, meetingPlaces);
    }
    catch (err:any) {
      ErrorHandler.setError(res, err);
    }
  };

  public getPriorityMeetingPlaceForTeacher = async (req: Request, res: Response): Promise<void> => {
    try {
      const teacherId: string = req.body.teacherId;
      const meetingPlace :MeetingPlaceModel = await this.meetingPlaceService.getPriorityMeetingPlaceForTeacher(teacherId);
      this.setFullAPIResponse(res, meetingPlace);
    }
    catch (err:any) {
      ErrorHandler.setError(res, err);
    }
  };

  public getAllMeetingPlacesByTeacher = async (req: Request, res: Response): Promise<void> => {
    try {
      const teacherId: string = req.body.teacherId;
      const meetingPlace: Array<MeetingPlaceModel> = await this.meetingPlaceService.getAllMeetingPlacesByTeacher(teacherId);
      this.setManyAPIResponse(res, meetingPlace);
    }
    catch (err:any) {
      ErrorHandler.setError(res, err);
    }
  };

  public editMeetingPlace = async (req: Request, res: Response): Promise<void> => {
    try {
      const meetingPlace: MeetingPlaceModel = req.body;
      const updatedMeetingPlace: MeetingPlaceModel = await this.meetingPlaceService.editMeetingPlace(meetingPlace);
      this.setFullAPIResponse(res, updatedMeetingPlace);
    }
    catch (err:any) {
      ErrorHandler.setError(res, err);
    }
  };

  public deleteMeetingPlace = async (req: Request, res: Response): Promise<void> => {
    try {
      const id: string = req.body.id;
      const meetingPlace: MeetingPlaceModel = await this.meetingPlaceService.deleteMeetingPlace(id);
      this.setFullAPIResponse(res, meetingPlace);
    }
    catch (err:any) {
      ErrorHandler.setError(res, err);
    }
  };

  private createModelWithId (createMeetingPlaceModel: CreateMeetingPlaceModel): MeetingPlaceModel {
    const guid: string = crypto.randomUUID();
    return {
      ...createMeetingPlaceModel,
      id: guid,
    };
  };

  private setFullAPIResponse (res: Response, responseData: MeetingPlaceModel): void {
    res
      .status(200)
      .json(responseData);
  }

  private setManyAPIResponse (res: Response, responseData: Array<MeetingPlaceModel>): void {
    res
      .status(200)
      .json(responseData);
  }
}