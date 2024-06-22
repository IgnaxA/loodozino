import { TeacherController } from "../teacher-controller";
import { TeacherService } from "../../services/teacher-service";
import { Request, Response } from "express";
import { CreateTeacherModel, EditTeacherModel, TeacherModel } from "../../models/teacher-models";
import { ErrorHandler } from "../../utils/error-handler";

export class TeacherControllerImpl implements TeacherController {
  private readonly teacherService: TeacherService;

  constructor(teacherService: TeacherService) {
    this.teacherService = teacherService;
  }

  public createTeacher = async (req: Request, res: Response): Promise<void> => {
    try {
      const teacherInput: CreateTeacherModel = req.body;
      const teacherInputWithGuid:TeacherModel = this.createModelWithId(teacherInput);
      await this.teacherService.createTeacher(teacherInputWithGuid);

      this.setFullAPIResponse(res, teacherInputWithGuid);

    } catch (err: any) {
      ErrorHandler.setError(res, err);
    }
  };

  public getTeacherById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id: string = req.body.id;
      const teacher :TeacherModel = await this.teacherService.getTeacherById(id);

      this.setFullAPIResponse(res, teacher);
    }
    catch (err:any) {
      ErrorHandler.setError(res, err);
    }
  };

  public getAllTeachers = async (req: Request, res: Response): Promise<void> => {
    try {
      const teachers :Array<TeacherModel> = await this.teacherService.getAllTeachers();

      this.setManyAPIResponse(res, teachers);
    }
    catch (err:any) {
      ErrorHandler.setError(res, err);
    }
  };

  public editTeacher = async (req: Request, res: Response): Promise<void> => {
    try {
      const teacher: EditTeacherModel = req.body;
      const updatedTeacher :EditTeacherModel = await this.teacherService.editTeacher(teacher);

      this.setEditAPIResponse(res, updatedTeacher);
    }
    catch (err:any) {
      ErrorHandler.setError(res, err);
    }
  };

  public deleteTeacher = async (req: Request, res: Response): Promise<void> => {
    try {
      const id: string = req.body.id;
      const teacher :TeacherModel = await this.teacherService.deleteTeacher(id);

      this.setFullAPIResponse(res, teacher);
    }
    catch (err:any) {
      ErrorHandler.setError(res, err);
    }
  };

  private createModelWithId (createTeacherModel: CreateTeacherModel): TeacherModel {
    const guid: string = crypto.randomUUID();
    return {
      ...createTeacherModel,
      id: guid,
    };
  };

  private setFullAPIResponse (res: Response, responseData: TeacherModel): void {
    res
      .status(200)
      .json(responseData);
  }

  private setEditAPIResponse (res: Response, responseData: EditTeacherModel): void {
    res
      .status(200)
      .json(responseData);
  }

  private setManyAPIResponse (res: Response, responseData: Array<TeacherModel>): void {
    res
      .status(200)
      .json(responseData);
  }
}