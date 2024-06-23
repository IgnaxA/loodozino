import { StudyProgramService } from "../study-program-service";
import { StudyProgramRepository } from "../../repositories/study-program-repository";
import { CreateStudyProgramModel, StudyProgramModel } from "../../models/study-program-models";
import { DegreeLevelModel } from "../../models/degree-level-models";
import { Assert } from "../../utils/assert";
import { ErrorHandler } from "../../utils/error-handler";

export class StudyProgramServiceImpl implements StudyProgramService {
  private readonly studyProgramRepository: StudyProgramRepository;

  constructor(studyProgramRepository: StudyProgramRepository) {
    this.studyProgramRepository = studyProgramRepository;
  }

  public async createStudyProgram(createStudyProgramModel:CreateStudyProgramModel): Promise<StudyProgramModel> {
    try {
      const studyProgramModel: StudyProgramModel = await this.studyProgramRepository.createStudyProgram(createStudyProgramModel);
      Assert.notNullOrUndefined(studyProgramModel, `Study program could not be created`);
      return studyProgramModel;
    }
    catch (err: any) {
      ErrorHandler.throwError(err, "Error when create study program");
    }
  };

  public async getStudyProgramById(id: string): Promise<StudyProgramModel> {
    try {
      const studyProgram: DegreeLevelModel = await this.studyProgramRepository.getStudyProgramById(id);
      Assert.notNullOrUndefined(studyProgram, `Study program level with ID ${id} not found`);
      return studyProgram;
    }
    catch (err: any) {
      ErrorHandler.throwError(err, "Error when get study program");
    }
  };

  public async getAllStudyPrograms(): Promise<Array<StudyProgramModel>> {
    try {
      const studyPrograms: Array<DegreeLevelModel> = await this.studyProgramRepository.getAllStudyPrograms();
      Assert.notNullOrUndefined(studyPrograms, `There are no study programs yet`);
      return studyPrograms;
    }
    catch (err: any) {
      ErrorHandler.throwError(err, "Error when get all study programs");
    }
  };

  public async editStudyProgram(studyProgramModel: StudyProgramModel): Promise<StudyProgramModel> {
    try {
      const updateStudyProgram: DegreeLevelModel = await this.studyProgramRepository.editStudyProgram(studyProgramModel);
      Assert.notNullOrUndefined(updateStudyProgram, `Study program with ID ${studyProgramModel.id} not found`);
      return updateStudyProgram;
    }
    catch (err: any) {
      ErrorHandler.throwError(err, "Error when edit study program");
    }
  };

  public async deleteStudyProgram(id: string): Promise<StudyProgramModel> {
    try {
      const studyProgram: StudyProgramModel = await this.studyProgramRepository.deleteStudyProgram(id);
      Assert.notNullOrUndefined(studyProgram,`Study program with ID ${id} not found`);
      return studyProgram;
    }
    catch (err: any) {
      ErrorHandler.throwError(err, "Error when delete study program");
    }
  };
}