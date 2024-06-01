import express, { Router } from "express";
import { BoardController } from "../controllers/board-controller";

export class BoardRouter {
  private readonly boardRouter: Router;
  private readonly boardController: BoardController;

  constructor(boardController: BoardController) {
    this.boardController = boardController;
    this.boardRouter = express.Router();
  }

  public setRouter(): void {
    this.boardRouter.get("/get_board", this.boardController.getBoard);
    this.boardRouter.post("/edit_board", this.boardController.editBoard);
    this.boardRouter.post("/create_board", this.boardController.createBoard);
    this.boardRouter.delete("/remove_board", this.boardController.removeBoard);
  }

  public getRouter(): Router {
    return this.boardRouter;
  }
}