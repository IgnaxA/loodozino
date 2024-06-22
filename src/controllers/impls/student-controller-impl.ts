import { StudentController } from "../student-controller";
import { StudentService } from "../../services/student-service";
import { Request, Response } from "express";
import { CreateStudentModel, EditStudentModel, StudentModel } from "../../models/student-models";
import { ErrorHandler } from "../../utils/error-handler";

export class StudentControllerImpl implements StudentController {
  private readonly studentService: StudentService;

  constructor(studentService: StudentService) {
    this.studentService = studentService;
  }

  public createStudent = async(req: Request, res: Response): Promise<void> => {
    try {
      const studentInput: CreateStudentModel = req.body;
      const studentInputWithGuid:StudentModel = this.createModelWithId(studentInput);
      await this.studentService.createStudent(studentInputWithGuid);

      this.setFullAPIResponse(res, studentInputWithGuid);

    } catch (err: any) {
      ErrorHandler.setError(res, err);
    }
  };

  public getStudentById = async(req: Request, res: Response): Promise<void> => {
    try {
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
      const students :Array<StudentModel> = await this.studentService.getAllStudents();
      this.setManyAPIResponse(res, students);
    }
    catch (err:any) {
      ErrorHandler.setError(res, err);
    }
  };

  public editStudent = async(req: Request, res: Response): Promise<void> => {
    try {
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
      const id: string = req.body.id;
      const student :StudentModel = await this.studentService.deleteStudent(id);

      this.setFullAPIResponse(res, student);
    }
    catch (err:any) {
      ErrorHandler.setError(res, err);
    }
  };

  private createModelWithId (createStudentModel: CreateStudentModel): StudentModel {
    const guid: string = crypto.randomUUID();
    return {
      ...createStudentModel,
      id: guid,
    };
  };

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
}

