import { IBoard } from "../../contracts/board";
import { BoardService } from "../board-service";
import { SettingsRepository } from "../../repositories/settings-repository";
import { BoardRepository } from "../../repositories/board-repository";

export class BoardServiceImpl implements BoardService {
  private readonly boardRepository: BoardRepository;

  constructor (boardRepository: BoardRepository) {
    this.boardRepository = boardRepository;
  }
  public createBoard = async(board: IBoard) : Promise<void> => {
    await this.boardRepository.createBoard(board);
  }

  public getBoard = async(board_ident: string): Promise<IBoard> => {
    // check na user_ident == null
    return await this.boardRepository.getBoard(board_ident);
  }

  public editBoard = async(board: IBoard): Promise<IBoard> => {
    return await this.boardRepository.editBoard(board);
  }

  public removeBoard = async(board_ident: string): Promise<IBoard> => {
    // check na user_ident == null
    return await this.boardRepository.removeBoard(board_ident);
  }
}