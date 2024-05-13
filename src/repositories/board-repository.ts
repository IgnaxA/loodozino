import { Board } from "../entities/board";

export interface BoardRepository {
    createPlayer(board: Board): Promise<Board>;
    getBoard(board_ident: string): Promise<Board>;
    removeBoard(board_ident: string): Promise<Board>;
}