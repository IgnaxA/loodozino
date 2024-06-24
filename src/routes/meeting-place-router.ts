import express, { Router } from "express";
import { DegreeLevelController } from "../controllers/degree-level-controller";
import { MeetingPlaceController } from "../controllers/meeting-place-controller";
import { verifyUser } from "../middlewares/verify-user";

export class MeetingPlaceRouter {
  private readonly meetingPlaceRouter: Router;
  private readonly meetingPlaceController: MeetingPlaceController;

  constructor(meetingPlaceController: MeetingPlaceController) {
    this.meetingPlaceController = meetingPlaceController;
    this.meetingPlaceRouter = express.Router();
  }

  public setRouter(): void {
    this.meetingPlaceRouter.get("/get", verifyUser, this.meetingPlaceController.getMeetingPlaceById);
    this.meetingPlaceRouter.get("/get-priority-by-teacher", verifyUser, this.meetingPlaceController.getPriorityMeetingPlaceForTeacher);
    this.meetingPlaceRouter.get("/get-all-by-teacher", verifyUser, this.meetingPlaceController.getAllMeetingPlacesByTeacher);
    this.meetingPlaceRouter.get("/get-all", verifyUser, this.meetingPlaceController.getAllMeetingPlaces);
    this.meetingPlaceRouter.post("/edit", verifyUser, this.meetingPlaceController.editMeetingPlace);
    this.meetingPlaceRouter.delete("/delete", verifyUser, this.meetingPlaceController.deleteMeetingPlace);
    this.meetingPlaceRouter.post("/create", verifyUser, this.meetingPlaceController.createMeetingPlace);
  }

  public getRouter(): Router {
    return this.meetingPlaceRouter;
  }
}