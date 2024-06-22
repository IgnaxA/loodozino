import { StudyProgramService } from "../study-program-service";
import { StudyProgramRepository } from "../../repositories/study-program-repository";
import { StudyProgramModel } from "../../models/study-program-models";
import { DegreeLevelModel } from "../../models/degree-level-models";
import { Assert } from "../../utils/assert";

export class StudyProgramServiceImpl implements StudyProgramService {
  private readonly studyProgramRepository: StudyProgramRepository;

  constructor(studyProgramRepository: StudyProgramRepository) {
    this.studyProgramRepository = studyProgramRepository;
  }

  public async createStudyProgram(studyProgramModel: StudyProgramModel): Promise<StudyProgramModel> {
    await this.studyProgramRepository.createStudyProgram(studyProgramModel);
    return studyProgramModel;
  };

  public async getStudyProgramById(id: string): Promise<StudyProgramModel> {
    const studyProgram: DegreeLevelModel = await this.studyProgramRepository.getStudyProgramById(id);
    Assert.notNullOrUndefined(studyProgram, `Study program level with ID ${id} not found`);
    return studyProgram;
  };

  public async getAllStudyPrograms(): Promise<Array<StudyProgramModel>> {
    const studyPrograms: Array<DegreeLevelModel> = await this.studyProgramRepository.getAllStudyPrograms();
    Assert.notNullOrUndefined(studyPrograms, `There are no study programs yet`);
    return studyPrograms;
  };

  public async editStudyProgram(studyProgramModel: StudyProgramModel): Promise<StudyProgramModel> {
    const updateStudyProgram: DegreeLevelModel = await this.studyProgramRepository.editStudyProgram(studyProgramModel);
    Assert.notNullOrUndefined(updateStudyProgram, `Study program with ID ${studyProgramModel.id} not found`);
    return updateStudyProgram;
  };

  public async deleteStudyProgram(id: string): Promise<StudyProgramModel> {
    const studyProgram: StudyProgramModel = await this.studyProgramRepository.deleteStudyProgram(id);
    Assert.notNullOrUndefined(studyProgram,`Study program with ID ${id} not found`);
    return studyProgram;
  };
}