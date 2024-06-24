import { RequestController } from "../controllers/request-controller";
import express, { Router } from "express";

export class RequestRouter {
  private readonly requestController: RequestController;
  private readonly requestRouter: Router;

  constructor(requestController : RequestController) {
    this.requestController = requestController;
    this.requestRouter = express.Router();
  }

  public setRouter(): void {
    this.requestRouter.post("/create-for-student", this.requestController.createRequestForStudent);
    this.requestRouter.post("/create", this.requestController.createRequest);
    this.requestRouter.post("/accept", this.requestController.acceptRequest);
    this.requestRouter.post("/accept", this.requestController.acceptRequest);
    this.requestRouter.post("/deny", this.requestController.denyRequest);
    this.requestRouter.post("/cancel-appointment", this.requestController.cancelAllRequestsByAppointment);

    this.requestRouter.get("/get-by-id", this.requestController.acceptRequest);
    this.requestRouter.get("/get-all", this.requestController.getAllRequests);
    this.requestRouter.get("/get-all-by-student", this.requestController.getAllRequestsByStudent);
    this.requestRouter.get("/get-all-by-appointment", this.requestController.getAllRequestsByAppointment);
  }

  public getRouter(): Router {
    return this.requestRouter;
  }
}