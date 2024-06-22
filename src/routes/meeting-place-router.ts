import express, { Router } from "express";
import { DegreeLevelController } from "../controllers/degree-level-controller";
import { MeetingPlaceController } from "../controllers/meeting-place-controller";

export class MeetingPlaceRouter {
  private readonly meetingPlaceRouter: Router;
  private readonly meetingPlaceController: MeetingPlaceController;

  constructor(meetingPlaceController: MeetingPlaceController) {
    this.meetingPlaceController = meetingPlaceController;
    this.meetingPlaceRouter = express.Router();
  }

  public setRouter(): void {
    this.meetingPlaceRouter.get("/get", this.meetingPlaceController.getMeetingPlaceById);
    this.meetingPlaceRouter.get("/get-priority-by-teacher", this.meetingPlaceController.getPriorityMeetingPlaceForTeacher);
    this.meetingPlaceRouter.get("/get-all-by-teacher", this.meetingPlaceController.getAllMeetingPlacesByTeacher);
    this.meetingPlaceRouter.get("/get-all", this.meetingPlaceController.getAllMeetingPlaces);
    this.meetingPlaceRouter.post("/edit", this.meetingPlaceController.editMeetingPlace);
    this.meetingPlaceRouter.delete("/delete", this.meetingPlaceController.deleteMeetingPlace);
    this.meetingPlaceRouter.post("/create", this.meetingPlaceController.createMeetingPlace);
  }

  public getRouter(): Router {
    return this.meetingPlaceRouter;
  }
}