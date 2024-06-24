import { AppointmentController } from "../appointment-controller";
import { AppointmentRepository } from "../../repositories/appointment-repository";
import { Request, Response } from "express";
import { AuthServiceResponse } from "../dtos/auth-service-response";
import { verifyUser } from "../../middlewares/verify-user";
import { InputAppointmentModel, AppointmentModel, AppointmentInfo } from "../../models/appointment-models";
import { ErrorHandler } from "../../utils/error-handler";

export class AppointmentControllerImpl implements AppointmentController {
  private readonly appointmentRepository: AppointmentRepository;

  constructor(appointmentRepository: AppointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  public createAppointmentForTeacher = async(req: Request, res: Response): Promise<void> => {
    try {
      const authStatus: AuthServiceResponse = await verifyUser(req);

      if (authStatus.isTokenExpired) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      if (authStatus.accessLevel !== 1) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      const teacherLogin: string = authStatus.login;
      const appointmentInfo: AppointmentInfo = req.body;
      const appointmentModel: AppointmentModel = await this.appointmentRepository.createAppointment(appointmentInfo, teacherLogin);

      this.setFullAPIResponse(res, appointmentModel);

    } catch (err: any) {
      ErrorHandler.setError(res, err);
    }
  };

  public createAppointment = async(req: Request, res: Response): Promise<void> => {
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

      const teacherLogin: string = req.body.teacherLogin;
      const appointmentInfo: AppointmentInfo = req.body;
      const appointmentModel: AppointmentModel = await this.appointmentRepository.createAppointment(appointmentInfo, teacherLogin);

      this.setFullAPIResponse(res, appointmentModel);

    } catch (err: any) {
      ErrorHandler.setError(res, err);
    }
  };


  public editAppointmentForTeacher = async(req: Request, res: Response): Promise<void> => {
    try {
      const authStatus: AuthServiceResponse = await verifyUser(req);

      if (authStatus.isTokenExpired) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      if (authStatus.accessLevel !== 1) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      const teacherLogin: string = authStatus.login;
      const appointmentInfo: AppointmentInfo = req.body;
      const updatedAppointmentModel: AppointmentModel = await this.appointmentRepository.editAppointmentInfo(appointmentInfo, teacherLogin);

      this.setFullAPIResponse(res, updatedAppointmentModel);

    } catch (err: any) {
      ErrorHandler.setError(res, err);
    }
  };

  public editAppointment = async(req: Request, res: Response): Promise<void> => {
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

      const teacherLogin: string = req.body.login;
      const appointmentInfo: AppointmentInfo = req.body;
      const updatedAppointmentModel: AppointmentModel = await this.appointmentRepository.editAppointmentInfo(appointmentInfo, teacherLogin);

      this.setFullAPIResponse(res, updatedAppointmentModel);

    } catch (err: any) {
      ErrorHandler.setError(res, err);
    }
  };

  public deleteAppointment = async(req: Request, res: Response): Promise<void> => {
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
      const appointmentModel: AppointmentModel = await this.appointmentRepository.deleteAppointment(appointmentId);

      this.setFullAPIResponse(res, appointmentModel);

    } catch (err: any) {
      ErrorHandler.setError(res, err);
    }
  };

  public getAppointmentById = async(req: Request, res: Response): Promise<void> => {
    try {
      const authStatus: AuthServiceResponse = await verifyUser(req);

      if (authStatus.isTokenExpired) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      const appointmentId: string = req.body.id;
      const appointmentModel: AppointmentModel = await this.appointmentRepository.getAppointmentById(appointmentId);

      this.setFullAPIResponse(res, appointmentModel);

    } catch (err: any) {
      ErrorHandler.setError(res, err);
    }
  };

  public getAllAppointments = async(req: Request, res: Response): Promise<void> => {
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

      const appointmentModels: Array<AppointmentModel> = await this.appointmentRepository.getAllAppointments();

      this.setManyAPIResponse(res, appointmentModels);

    } catch (err: any) {
      ErrorHandler.setError(res, err);
    }
  };

  public getAllAppointmentsByMonthForTeacher = async(req: Request, res: Response): Promise<void> => {
    try {
      const authStatus: AuthServiceResponse = await verifyUser(req);

      if (authStatus.isTokenExpired) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      if (authStatus.accessLevel !== 1) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      const month: string = req.body.month;
      const year: string = req.body.year;
      const teacherLogin: string = authStatus.login;
      const appointmentModels: Array<AppointmentModel> = await this.appointmentRepository.getAllAppointmentsByMonthByTeacher(month, year, teacherLogin);

      this.setManyAPIResponse(res, appointmentModels);

    } catch (err: any) {
      ErrorHandler.setError(res, err);
    }
  };

  public getAllAppointmentsByMonthForStudent = async(req: Request, res: Response): Promise<void> => {
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

      const month: string = req.body.month;
      const year: string = req.body.year;
      const studentLogin: string = authStatus.login;
      const appointmentModels: Array<AppointmentModel> = await this.appointmentRepository.getAllAppointmentsByMonthByStudent(month, year, studentLogin);

      this.setManyAPIResponse(res, appointmentModels);

    } catch (err: any) {
      ErrorHandler.setError(res, err);
    }
  };

  public getAllAppointmentsForTeacher = async(req: Request, res: Response): Promise<void> => {
    try {
      const authStatus: AuthServiceResponse = await verifyUser(req);

      if (authStatus.isTokenExpired) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      if (authStatus.accessLevel !== 1) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      const teacherLogin: string = authStatus.login;
      const appointmentModels: Array<AppointmentModel> = await this.appointmentRepository.getAllAppointmentsByTeacher(teacherLogin);

      this.setManyAPIResponse(res, appointmentModels);

    } catch (err: any) {
      ErrorHandler.setError(res, err);
    }
  };

  public getAllAppointmentsForStudent = async(req: Request, res: Response): Promise<void> => {
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
      const appointmentModels: Array<AppointmentModel> = await this.appointmentRepository.getAllAppointmentsByStudent(studentLogin);

      this.setManyAPIResponse(res, appointmentModels);

    } catch (err: any) {
      ErrorHandler.setError(res, err);
    }
  };

  private setFullAPIResponse (res: Response, responseData: AppointmentModel): void {
    res
      .status(200)
      .json(responseData);
  }

  private setManyAPIResponse (res: Response, responseData: Array<AppointmentModel>): void {
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