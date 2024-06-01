import { IBoard } from "../contracts/board";

export interface BoardService {
  createBoard(board: IBoard) : Promise<void>;
  getBoard(board_ident: string): Promise<IBoard>;
  editBoard(board: IBoard): Promise<IBoard>;
  removeBoard(board_ident: string): Promise<IBoard>;
}