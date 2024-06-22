import { MeetingPlaceService } from "../meeting-place-service";
import { StudyProgramRepository } from "../../repositories/study-program-repository";
import { MeetingPlaceRepository } from "../../repositories/meeting-place-repository";
import { MeetingPlaceModel } from "../../models/meeting-place-models";
import { DegreeLevelModel } from "../../models/degree-level-models";
import { Assert } from "../../utils/assert";

export class MeetingPlaceServiceImpl implements MeetingPlaceService {
  private readonly meetingPlaceRepository: MeetingPlaceRepository;

  constructor(meetingPlaceRepository: MeetingPlaceRepository) {
    this.meetingPlaceRepository = meetingPlaceRepository;
  }

  public async createMeetingPlace(meetingPlaceModel: MeetingPlaceModel): Promise<MeetingPlaceModel> {
    await this.meetingPlaceRepository.createMeetingPlace(meetingPlaceModel);
    return meetingPlaceModel;
  };

  public async getMeetingPlaceById(id: string): Promise<MeetingPlaceModel> {
    const meetingPlace: MeetingPlaceModel = await this.meetingPlaceRepository.getMeetingPlaceById(id);
    Assert.notNullOrUndefined(meetingPlace, `Meeting place with ID ${id} not found`);
    return meetingPlace;
  };

  public async getAllMeetingPlaces(): Promise<Array<MeetingPlaceModel>> {
    const meetingPlaces: Array<MeetingPlaceModel> = await this.meetingPlaceRepository.getAllMeetingPlaces();
    Assert.notNullOrUndefined(meetingPlaces, `There are no meeting places yet`);
    return meetingPlaces;
  };

  public async getPriorityMeetingPlaceForTeacher(teacherId: string): Promise<MeetingPlaceModel> {
    const meetingPlace: MeetingPlaceModel = await this.meetingPlaceRepository.getPriorityMeetingPlaceForTeacher(teacherId);
    Assert.notNullOrUndefined(meetingPlace, `There are no priority meeting place for teacher with ID ${teacherId}`);
    return meetingPlace;
  };

  public async getAllMeetingPlacesByTeacher(teacherId: string): Promise<Array<MeetingPlaceModel>> {
    const meetingPlaces: Array<MeetingPlaceModel> = await this.meetingPlaceRepository.getAllMeetingPlacesByTeacher(teacherId);
    Assert.notNullOrUndefined(meetingPlaces, `There are no meeting places for teacher with ID ${teacherId}`);
    return meetingPlaces;
  };

  public async editMeetingPlace(meetingPlaceModel: MeetingPlaceModel): Promise<MeetingPlaceModel> {
    const meetingPlace: MeetingPlaceModel = await this.meetingPlaceRepository.editMeetingPlace(meetingPlaceModel);
    Assert.notNullOrUndefined(meetingPlace, `There are no meeting place with ID ${meetingPlace.id}`);
    return meetingPlace;
  };

  public async deleteMeetingPlace(id: string): Promise<MeetingPlaceModel> {
    const meetingPlace: MeetingPlaceModel = await this.meetingPlaceRepository.deleteMeetingPlace(id);
    Assert.notNullOrUndefined(meetingPlace, `There are no meeting place with ID ${meetingPlace.id}`);
    return meetingPlace;
  };
}