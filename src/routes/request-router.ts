import { RequestController } from "../controllers/request-controller";
import express, { Router } from "express";
import { verifyUser } from "../middlewares/verify-user";

export class RequestRouter {
  private readonly requestController: RequestController;
  private readonly requestRouter: Router;

  constructor(requestController : RequestController) {
    this.requestController = requestController;
    this.requestRouter = express.Router();
  }

  public setRouter(): void {
    this.requestRouter.post("/create-for-student", verifyUser, this.requestController.createRequestForStudent);
    this.requestRouter.post("/create", verifyUser, this.requestController.createRequest);
    this.requestRouter.post("/accept", verifyUser, this.requestController.acceptRequest);
    this.requestRouter.post("/accept", verifyUser, this.requestController.acceptRequest);
    this.requestRouter.post("/deny", verifyUser, this.requestController.denyRequest);
    this.requestRouter.post("/cancel-appointment", verifyUser, this.requestController.cancelAllRequestsByAppointment);

    this.requestRouter.get("/get-by-id", verifyUser, this.requestController.acceptRequest);
    this.requestRouter.get("/get-all", verifyUser, this.requestController.getAllRequests);
    this.requestRouter.get("/get-all-by-student", verifyUser, this.requestController.getAllRequestsByStudent);
    this.requestRouter.get("/get-all-by-appointment", verifyUser, this.requestController.getAllRequestsByAppointment);
  }

  public getRouter(): Router {
    return this.requestRouter;
  }
}