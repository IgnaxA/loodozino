import { TeacherController } from "../teacher-controller";
import { TeacherService } from "../../services/teacher-service";
import { Request, Response } from "express";
import { InputTeacherModel, TeacherModel } from "../../models/teacher-models";
import { ErrorHandler } from "../../utils/error-handler";
import { verifyUser } from "../../middlewares/verify-user";
import { AuthServiceResponse } from "../dtos/auth-service-response";

export class TeacherControllerImpl implements TeacherController {
  private readonly teacherService: TeacherService;

  constructor(teacherService: TeacherService) {
    this.teacherService = teacherService;
  }

  public createTeacher = async (req: Request, res: Response): Promise<void> => {
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

      const teacherBody: TeacherModel = req.body;
      const teacherModel:TeacherModel = await this.teacherService.createTeacher(teacherBody);

      this.setAPIResponse(res, teacherModel);

    } catch (err: any) {
      ErrorHandler.setError(res, err);
    }
  };

  public getAllTeachers = async (req: Request, res: Response): Promise<void> => {
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

      const teachers :Array<TeacherModel> = await this.teacherService.getAllTeachers();

      this.setManyAPIResponse(res, teachers);
    }
    catch (err:any) {
      ErrorHandler.setError(res, err);
    }
  };

  public editTeacher = async (req: Request, res: Response): Promise<void> => {
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

      const login: string = authStatus.login;
      const inputTeacherModel: InputTeacherModel = req.body;
      const updatedTeacher: TeacherModel = await this.teacherService.editTeacher(inputTeacherModel, login);

      this.setAPIResponse(res, updatedTeacher);
    }
    catch (err:any) {
      ErrorHandler.setError(res, err);
    }
  };

  public deleteTeacher = async (req: Request, res: Response): Promise<void> => {
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

      const login: string = req.body.login;
      const teacher :TeacherModel = await this.teacherService.deleteTeacher(login);

      this.setAPIResponse(res, teacher);
    }
    catch (err:any) {
      ErrorHandler.setError(res, err);
    }
  };

  public getTeacherByLogin = async (req: Request, res: Response): Promise<void> => {
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

      const login: string = authStatus.login;
      const teacher :TeacherModel = await this.teacherService.getTeacherByLogin(login);

      this.setAPIResponse(res, teacher);
    }
    catch (err:any) {
      ErrorHandler.setError(res, err);
    }
  };

  private setAPIResponse (res: Response, responseData: TeacherModel): void {
    res
      .status(200)
      .json(responseData);
  }


  private setManyAPIResponse (res: Response, responseData: Array<TeacherModel>): void {
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