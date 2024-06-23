import { StudentController } from "../student-controller";
import { StudentService } from "../../services/student-service";
import { Request, Response } from "express";
import {
  InputStudentModel,
  StudentModel,
} from "../../models/student-models";
import { ErrorHandler } from "../../utils/error-handler";
import { verifyUser } from "../../middlewares/verify-user";
import { AuthServiceResponse } from "../dtos/auth-service-response";

export class StudentControllerImpl implements StudentController {
  private readonly studentService: StudentService;

  constructor(studentService: StudentService) {
    this.studentService = studentService;
  }

  public createStudent = async(req: Request, res: Response): Promise<void> => {
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

      const studentBody: StudentModel = req.body;
      const createdStudent: StudentModel = await this.studentService.createStudent(studentBody);

      this.setAPIResponse(res, createdStudent);

    } catch (err: any) {
      ErrorHandler.setError(res, err);
    }
  };

  public getAllStudents = async(req: Request, res: Response): Promise<void> => {
    try {
      const authStatus: AuthServiceResponse = await verifyUser(req);

      if (authStatus.isTokenExpired) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      if (authStatus.accessLevel !== 0 && authStatus.accessLevel !== 2) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      const students :Array<StudentModel> = await this.studentService.getAllStudents();
      this.setManyAPIResponse(res, students);
    }
    catch (err:any) {
      ErrorHandler.setError(res, err);
    }
  };

  public editStudent = async(req: Request, res: Response): Promise<void> => {
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
      const inputStudentModel: InputStudentModel = req.body;
      const updatedStudent: StudentModel = await this.studentService.editStudent(inputStudentModel, login);
      this.setAPIResponse(res, updatedStudent);
    }
    catch (err:any) {
      ErrorHandler.setError(res, err);
    }
  };

  public deleteStudent = async(req: Request, res: Response): Promise<void> => {
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
      const student :StudentModel = await this.studentService.deleteStudent(login);

      this.setAPIResponse(res, student);
    }
    catch (err:any) {
      ErrorHandler.setError(res, err);
    }
  };

  public getStudentByLogin = async(req: Request, res: Response): Promise<void> => {
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
      const student :StudentModel = await this.studentService.getStudentByLogin(login);

      this.setAPIResponse(res, student);
    }
    catch (err:any) {
      ErrorHandler.setError(res, err);
    }
  }

  private setAPIResponse (res: Response, responseData: StudentModel): void {
    res
      .status(200)
      .json(responseData);
  }

  private setManyAPIResponse (res: Response, responseData: Array<StudentModel>): void {
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

