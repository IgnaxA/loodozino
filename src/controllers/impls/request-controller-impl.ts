import { RequestController } from "../request-controller";
import { Request, Response } from "express";
import { RequestRepository } from "../../repositories/request-repository";
import { AuthServiceResponse } from "../dtos/auth-service-response";
import { verifyUser } from "../../middlewares/verify-user";
import { InputAppointmentModel, AppointmentModel } from "../../models/appointment-models";
import { ErrorHandler } from "../../utils/error-handler";
import { RequestModel } from "../../models/request-models";

export class RequestControllerImpl implements RequestController {
  private readonly requestRepository: RequestRepository;

  constructor(requestRepository: RequestRepository) {
    this.requestRepository = requestRepository;
  }

  public createRequestForStudent = async(req: Request, res: Response): Promise<void> => {
    try {
      const authStatus: AuthServiceResponse = await verifyUser(req);

      if (authStatus.isTokenExpired) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      if (authStatus.accessLevel !== 2) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      const studentLogin: string = authStatus.login;
      const appointmentId: string = req.body.appointmentId;
      const requestModel: RequestModel = await this.requestRepository.createRequest(appointmentId, studentLogin);

      this.setFullAPIResponse(res, requestModel);

    } catch (err: any) {
      ErrorHandler.setError(res, err);
    }
  };

  public createRequest = async(req: Request, res: Response): Promise<void> => {
    try {
      const authStatus: AuthServiceResponse = await verifyUser(req);

      if (authStatus.isTokenExpired) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      if (authStatus.accessLevel !== 0) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      const studentLogin: string = req.body.studentLogin;
      const appointmentId: string = req.body.appointmentId;
      const requestModel: RequestModel = await this.requestRepository.createRequest(appointmentId, studentLogin);

      this.setFullAPIResponse(res, requestModel);

    } catch (err: any) {
      ErrorHandler.setError(res, err);
    }
  };


  public acceptRequest = async(req: Request, res: Response): Promise<void> => {
    try {
      const authStatus: AuthServiceResponse = await verifyUser(req);

      if (authStatus.isTokenExpired) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      if (authStatus.accessLevel !== 0 && authStatus.accessLevel != 1) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      const id: string = req.body.id;
      const requestModel: RequestModel = await this.requestRepository.acceptRequest(id);

      this.setFullAPIResponse(res, requestModel);

    } catch (err: any) {
      ErrorHandler.setError(res, err);
    }
  };

  public denyRequest = async(req: Request, res: Response): Promise<void> => {
    try {
      const authStatus: AuthServiceResponse = await verifyUser(req);

      if (authStatus.isTokenExpired) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      if (authStatus.accessLevel !== 0 && authStatus.accessLevel != 1) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      const id: string = req.body.id;
      const requestModel: RequestModel = await this.requestRepository.denyRequest(id);

      this.setFullAPIResponse(res, requestModel);

    } catch (err: any) {
      ErrorHandler.setError(res, err);
    }
  };

  public cancelAllRequestsByAppointment = async(req: Request, res:Response): Promise<void> => {
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

      const appointmentId: string = req.body.appointmentId;
      const requestModels: Array<RequestModel> = await this.requestRepository.cancelAllRequestsByAppointment(appointmentId);

      this.setManyAPIResponse(res, requestModels);

    } catch (err: any) {
      ErrorHandler.setError(res, err);
    }
  };


  public getRequestById = async(req: Request, res: Response): Promise<void> => {
    try {
      const authStatus: AuthServiceResponse = await verifyUser(req);

      if (authStatus.isTokenExpired) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      const id: string = req.body.id;
      const requestModel: RequestModel = await this.requestRepository.getRequestById(id);

      this.setFullAPIResponse(res, requestModel);

    } catch (err: any) {
      ErrorHandler.setError(res, err);
    }
  };

  public getAllRequests = async(req: Request, res: Response): Promise<void> => {
    try {
      const authStatus: AuthServiceResponse = await verifyUser(req);

      if (authStatus.isTokenExpired) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      if (authStatus.accessLevel !== 0) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      const requestModels: Array<RequestModel> = await this.requestRepository.getAllRequests();

      this.setManyAPIResponse(res, requestModels);

    } catch (err: any) {
      ErrorHandler.setError(res, err);
    }
  };

  public getAllRequestsByStudent = async(req: Request, res: Response): Promise<void> => {
    try {
      const authStatus: AuthServiceResponse = await verifyUser(req);

      if (authStatus.isTokenExpired) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      if (authStatus.accessLevel !== 2) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      const studentLogin: string = authStatus.login;
      const requestModels: Array<RequestModel> = await this.requestRepository.getAllRequestsByStudent(studentLogin);

      this.setManyAPIResponse(res, requestModels);

    } catch (err: any) {
      ErrorHandler.setError(res, err);
    }
  };

  public getAllRequestsByAppointment = async(req: Request, res: Response): Promise<void> => {
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

      const appointmentId: string = req.body.appointmentId;
      const requestModels: Array<RequestModel> = await this.requestRepository.getAllRequestsByAppointment(appointmentId);

      this.setManyAPIResponse(res, requestModels);

    } catch (err: any) {
      ErrorHandler.setError(res, err);
    }
  };

  private setFullAPIResponse (res: Response, responseData: RequestModel): void {
    res
      .status(200)
      .json(responseData);
  }

  private setManyAPIResponse (res: Response, responseData: Array<RequestModel>): void {
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