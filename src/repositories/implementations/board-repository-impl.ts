import { IBoard } from "../../contracts/board";
import { BoardRepository } from "../board-repository";
import { BoardModel } from "../../models/board-model";
import { SettingsModel } from "../../models/settings-model";
import { Assert } from "../../utils/assert";
import { ISettings } from "../../contracts/settings";
import { Board } from "../../entities/board";

export class BoardRepositoryImpl implements BoardRepository {
  constructor() {};
  public createBoard = async(board: IBoard) : Promise<void> => {
    const boardModel = new BoardModel(board);

    await boardModel.save();
  }

  public getBoard = async(board_ident: String) : Promise<IBoard> => {
    const board = await BoardModel.findOne(board_ident);
    Assert.notNullOrUndefined(board, "This board does not exist");
    const boardInterface: IBoard = new BoardModel(board);
    return boardInterface;
  }

  public editBoard = async(board: IBoard) : Promise<IBoard> => {
    const filter = { board_ident: board.board_ident};
    const update = { board_name: board.board_name, created_at:board.created_at};
    const newBoard = await BoardModel.findOneAndUpdate(filter, update, {new: true});

    const boardInterface: IBoard = new BoardModel(newBoard);
    return boardInterface;
  }

  public removeBoard = async(board_ident: String): Promise<IBoard> => {
    const board = await BoardModel.findOneAndDelete(board_ident);

    const boardInterface: IBoard = new BoardModel(board);
    return boardInterface;
  }

}