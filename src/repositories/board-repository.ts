import { IBoard } from "../contracts/board";

export interface BoardRepository {
  createBoard(board: IBoard) : Promise<void>;
  getBoard(board_ident: String) : Promise<IBoard>;
  editBoard(board: IBoard) : Promise<IBoard>;
  removeBoard(board_ident: String): Promise<IBoard>;
}