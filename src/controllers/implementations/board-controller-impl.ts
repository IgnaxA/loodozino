import { Request, Response } from "express";
import { BoardController } from "../board-controller";
import { SettingsService } from "../../services/settings-service";
import { BoardService } from "../../services/board-service";
import { ErrorHandler } from "../../utils/error-handler";
import { IBoard } from "../../contracts/board";

export class BoardControllerImpl implements BoardController {
  private readonly boardService: BoardService;

  constructor(boardService: BoardService) {
    this.boardService = boardService;
  };
  public createBoard = async(req: Request, res: Response) : Promise<void> => {
    try {
      const board: IBoard = req.body;
      await this.boardService.createBoard(board);
      this.setAPIResponse(res, board);

    } catch (err: any) {
      ErrorHandler.setError(res, err);
    }
  }
  public getBoard = async(req: Request, res: Response): Promise<void> => {
    try {
      const board_ident: string = req.body;
      const board = await this.boardService.getBoard(board_ident);
      this.setAPIResponse(res, board);

    } catch (err: any) {
      ErrorHandler.setError(res, err);
    }
  }

  public editBoard = async(req: Request, res: Response): Promise<void> => {
    try {
      const new_board: IBoard = req.body;
      const board = await this.boardService.editBoard(new_board);
      this.setAPIResponse(res, board);

    } catch (err: any) {
      ErrorHandler.setError(res, err);
    }
  }

  public removeBoard = async(req: Request, res: Response): Promise<void> => {
    try {
      const board_ident: string = req.body;
      const board = await this.boardService.removeBoard(board_ident);
      this.setAPIResponse(res, board);

    } catch (err: any) {
      ErrorHandler.setError(res, err);
    }
  }

  private setAPIResponse(res: Response, responseData: IBoard): void {
    res
      .status(200)
      .json(responseData);
  }

}