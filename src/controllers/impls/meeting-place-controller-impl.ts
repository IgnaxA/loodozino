import { MeetingPlaceController } from "../meeting-place-controller";
import { MeetingPlaceService } from "../../services/meeting-place-service";
import { Request, Response } from "express";
import { ErrorHandler } from "../../utils/error-handler";
import { CreateMeetingPlaceModel, EditMeetingPlaceModel, MeetingPlaceModel } from "../../models/meeting-place-models";
import { verifyUser } from "../../middlewares/verify-user";
import { CreateDegreeLevelModel, DegreeLevelModel } from "../../models/degree-level-models";
import { AuthServiceResponse } from "../dtos/auth-service-response";

export class MeetingPlaceControllerImpl implements MeetingPlaceController {
  private readonly meetingPlaceService: MeetingPlaceService;

  constructor(meetingPlaceService: MeetingPlaceService) {
    this.meetingPlaceService = meetingPlaceService;
  }

  public createMeetingPlace = async (req: Request, res: Response): Promise<void> => {
    try {
      const authStatus: AuthServiceResponse = await verifyUser(req);

      if (authStatus.isTokenExpired) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      if (authStatus.accessLevel !== 0 && authStatus.accessLevel !== 1) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      const teacherLogin: string = authStatus.login;
      const createMeetingPlaceModel: CreateMeetingPlaceModel = req.body;
      const meetingPlaceModel: MeetingPlaceModel = await this.meetingPlaceService.createMeetingPlace(createMeetingPlaceModel, teacherLogin);

      this.setFullAPIResponse(res, meetingPlaceModel);

    } catch (err: any) {
      ErrorHandler.setError(res, err);
    }
  };

  public getMeetingPlaceById = async (req: Request, res: Response): Promise<void> => {
    try {
      const authStatus: AuthServiceResponse = await verifyUser(req);

      if (authStatus.isTokenExpired) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      if (authStatus.accessLevel !== 0 && authStatus.accessLevel !== 1) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

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
      const authStatus: AuthServiceResponse = await verifyUser(req);

      if (authStatus.isTokenExpired) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      if (authStatus.accessLevel !== 0 && authStatus.accessLevel !== 1) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      const meetingPlaces :Array<MeetingPlaceModel> = await this.meetingPlaceService.getAllMeetingPlaces();
      this.setManyAPIResponse(res, meetingPlaces);
    }
    catch (err:any) {
      ErrorHandler.setError(res, err);
    }
  };

  public getPriorityMeetingPlaceForTeacher = async (req: Request, res: Response): Promise<void> => {
    try {
      const authStatus: AuthServiceResponse = await verifyUser(req);

      if (authStatus.isTokenExpired) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      if (authStatus.accessLevel !== 0 && authStatus.accessLevel !== 1) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      const teacherLogin: string = authStatus.login;
      const offline: boolean = req.body.offline;
      const meetingPlace :MeetingPlaceModel = await this.meetingPlaceService.getPriorityMeetingPlaceForTeacher(teacherLogin, offline);
      this.setFullAPIResponse(res, meetingPlace);
    }
    catch (err:any) {
      ErrorHandler.setError(res, err);
    }
  };

  public getAllMeetingPlacesByTeacher = async (req: Request, res: Response): Promise<void> => {
    try {
      const authStatus: AuthServiceResponse = await verifyUser(req);

      if (authStatus.isTokenExpired) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      if (authStatus.accessLevel !== 0 && authStatus.accessLevel !== 1) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      const teacherLogin: string = authStatus.login;
      const offline: boolean = req.body.offline;
      const meetingPlace: Array<MeetingPlaceModel> = await this.meetingPlaceService.getAllMeetingPlacesByTeacher(teacherLogin, offline);
      this.setManyAPIResponse(res, meetingPlace);
    }
    catch (err:any) {
      ErrorHandler.setError(res, err);
    }
  };

  public editMeetingPlace = async (req: Request, res: Response): Promise<void> => {
    try {
      const authStatus: AuthServiceResponse = await verifyUser(req);

      if (authStatus.isTokenExpired) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      if (authStatus.accessLevel !== 0 && authStatus.accessLevel !== 1) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      const teacherLogin: string = authStatus.login;
      const meetingPlace: EditMeetingPlaceModel = req.body;
      const updatedMeetingPlace: MeetingPlaceModel = await this.meetingPlaceService.editMeetingPlace(meetingPlace, teacherLogin);
      this.setFullAPIResponse(res, updatedMeetingPlace);
    }
    catch (err:any) {
      ErrorHandler.setError(res, err);
    }
  };

  public deleteMeetingPlace = async (req: Request, res: Response): Promise<void> => {
    try {
      const authStatus: AuthServiceResponse = await verifyUser(req);

      if (authStatus.isTokenExpired) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      if (authStatus.accessLevel !== 0 && authStatus.accessLevel !== 1) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      const id: string = req.body.id;
      const meetingPlace: MeetingPlaceModel = await this.meetingPlaceService.deleteMeetingPlace(id);
      this.setFullAPIResponse(res, meetingPlace);
    }
    catch (err:any) {
      ErrorHandler.setError(res, err);
    }
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
  private setUnableToAccessAPIResponse (res: Response): void {
    res
      .status(403)
      .json();
  }
}
