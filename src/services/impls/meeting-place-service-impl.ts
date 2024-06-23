import { MeetingPlaceService } from "../meeting-place-service";
import { StudyProgramRepository } from "../../repositories/study-program-repository";
import { MeetingPlaceRepository } from "../../repositories/meeting-place-repository";
import { CreateMeetingPlaceModel, MeetingPlaceModel } from "../../models/meeting-place-models";
import { DegreeLevelModel } from "../../models/degree-level-models";
import { Assert } from "../../utils/assert";
import { ErrorHandler } from "../../utils/error-handler";

export class MeetingPlaceServiceImpl implements MeetingPlaceService {
  private readonly meetingPlaceRepository: MeetingPlaceRepository;

  constructor(meetingPlaceRepository: MeetingPlaceRepository) {
    this.meetingPlaceRepository = meetingPlaceRepository;
  }

  public async createMeetingPlace(createMeetingPlaceModel:CreateMeetingPlaceModel): Promise<MeetingPlaceModel> {
    try {
      const meetingPlaceModel: MeetingPlaceModel = await this.meetingPlaceRepository.createMeetingPlace(createMeetingPlaceModel);
      Assert.notNullOrUndefined(meetingPlaceModel, `Meeting place could not be created`);
      return meetingPlaceModel;
    } catch (err: any) {
      ErrorHandler.throwError(err, "Error when create meeting place");
    }
  };

  public async getMeetingPlaceById(id: string): Promise<MeetingPlaceModel> {
    try {
      const meetingPlace: MeetingPlaceModel = await this.meetingPlaceRepository.getMeetingPlaceById(id);
      Assert.notNullOrUndefined(meetingPlace, `Meeting place with ID ${id} not found`);
      return meetingPlace;
    } catch (err: any) {
      ErrorHandler.throwError(err, "Error when get meeting place");
    }
  };

  public async getAllMeetingPlaces(): Promise<Array<MeetingPlaceModel>> {
    try {
      const meetingPlaces: Array<MeetingPlaceModel> = await this.meetingPlaceRepository.getAllMeetingPlaces();
      Assert.notNullOrUndefined(meetingPlaces, `There are no meeting places yet`);
      return meetingPlaces;
    } catch (err: any) {
      ErrorHandler.throwError(err, "Error when get all meeting places");
    }
  };

  public async getPriorityMeetingPlaceForTeacher(teacherId: string): Promise<MeetingPlaceModel> {
    try {
      const meetingPlace: MeetingPlaceModel = await this.meetingPlaceRepository.getPriorityMeetingPlaceForTeacher(teacherId);
      Assert.notNullOrUndefined(meetingPlace, `There are no priority meeting place for teacher with ID ${teacherId}`);
      return meetingPlace;
    } catch (err: any) {
      ErrorHandler.throwError(err, "Error when get priority meeting place for teacher");
    }
  };

  public async getAllMeetingPlacesByTeacher(teacherId: string): Promise<Array<MeetingPlaceModel>> {
    try {
      const meetingPlaces: Array<MeetingPlaceModel> = await this.meetingPlaceRepository.getAllMeetingPlacesByTeacher(teacherId);
      Assert.notNullOrUndefined(meetingPlaces, `There are no meeting places for teacher with ID ${teacherId}`);
      return meetingPlaces;
    } catch (err: any) {
      ErrorHandler.throwError(err, "Error when get all meeting places by teacher");
    }
  };

  public async editMeetingPlace(meetingPlaceModel: MeetingPlaceModel): Promise<MeetingPlaceModel> {
    try {
      const meetingPlace: MeetingPlaceModel = await this.meetingPlaceRepository.editMeetingPlace(meetingPlaceModel);
      Assert.notNullOrUndefined(meetingPlace, `There are no meeting place with ID ${meetingPlace.id}`);
      return meetingPlace;
    } catch (err: any) {
      ErrorHandler.throwError(err, "Error when edit meeting place");
    }
  };

  public async deleteMeetingPlace(id: string): Promise<MeetingPlaceModel> {
    try {
      const meetingPlace: MeetingPlaceModel = await this.meetingPlaceRepository.deleteMeetingPlace(id);
      Assert.notNullOrUndefined(meetingPlace, `There are no meeting place with ID ${meetingPlace.id}`);
      return meetingPlace;
    } catch (err: any) {
      ErrorHandler.throwError(err, "Error when delete meeting place");
    }
  };
}