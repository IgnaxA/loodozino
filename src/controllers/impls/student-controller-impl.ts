import { StudentController } from "../student-controller";
import { StudentService } from "../../services/student-service";
import { Request, Response } from "express";
import { CreateStudentModel, EditStudentModel, StudentModel } from "../../models/student-models";
import { ErrorHandler } from "../../utils/error-handler";
import { RequestHeaderDto } from "../dtos/request-header-dto";
import { ParseHelper } from "../../utils/parse-helper";

export class StudentControllerImpl implements StudentController {
  private readonly studentService: StudentService;

  constructor(studentService: StudentService) {
    this.studentService = studentService;
  }

  public createStudent = async(req: Request, res: Response): Promise<void> => {
    try {
      const isTokenExpired:boolean = ParseHelper.parseBoolean(req.get("isTokenExpired"));

      if (isTokenExpired) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      const studentInput: CreateStudentModel = req.body;
      const createdStudent: StudentModel = await this.studentService.createStudent(studentInput);

      this.setFullAPIResponse(res, createdStudent);

    } catch (err: any) {
      ErrorHandler.setError(res, err);
    }
  };

  public getStudentById = async(req: Request, res: Response): Promise<void> => {
    try {
      const isTokenExpired:boolean = ParseHelper.parseBoolean(req.get("isTokenExpired"));

      if (isTokenExpired) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      const id: string = req.body.id;
      const student :StudentModel = await this.studentService.getStudentById(id);

      this.setFullAPIResponse(res, student);
    }
    catch (err:any) {
      ErrorHandler.setError(res, err);
    }
  };

  public getAllStudents = async(req: Request, res: Response): Promise<void> => {
    try {
      const isTokenExpired:boolean = ParseHelper.parseBoolean(req.get("isTokenExpired"));

      if (isTokenExpired) {
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
      const isTokenExpired:boolean = ParseHelper.parseBoolean(req.get("isTokenExpired"));

      if (isTokenExpired) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      const student: EditStudentModel = req.body;
      const updatedStudent :EditStudentModel = await this.studentService.editStudent(student);
      this.setEditAPIResponse(res, updatedStudent);
    }
    catch (err:any) {
      ErrorHandler.setError(res, err);
    }
  };

  public deleteStudent = async(req: Request, res: Response): Promise<void> => {
    try {
      const isTokenExpired:boolean = ParseHelper.parseBoolean(req.get("isTokenExpired"));

      if (isTokenExpired) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      const id: string = req.body.id;
      const student :StudentModel = await this.studentService.deleteStudent(id);

      this.setFullAPIResponse(res, student);
    }
    catch (err:any) {
      ErrorHandler.setError(res, err);
    }
  };

  public getStudentByLogin = async(req: Request, res: Response): Promise<void> => {
    try {
      const isTokenExpired:boolean = ParseHelper.parseBoolean(req.get("isTokenExpired"));

      if (isTokenExpired) {
        this.setUnableToAccessAPIResponse(res);
        return;
      }

      const id: string = req.body.id;
      const student :StudentModel = await this.studentService.getStudentByLogin(id);

      this.setFullAPIResponse(res, student);
    }
    catch (err:any) {
      ErrorHandler.setError(res, err);
    }
  }

  private setFullAPIResponse (res: Response, responseData: StudentModel): void {
    res
      .status(200)
      .json(responseData);
  }

  private setEditAPIResponse (res: Response, responseData: EditStudentModel): void {
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
      .status(403);
  }
}

