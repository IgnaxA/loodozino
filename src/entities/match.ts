import { Player_Info } from "./player_info";

export class Match {
    private board_ident: String = "";
    private players_info: Array<Player_Info> = new Array<Player_Info>;
  
    public setBoard(board_ident: String, players_info: Array<Player_Info>) {
        this.board_ident = board_ident;
        this.players_info = players_info;
    }
  
    public getBoardIdent(): String {
        return this.board_ident;
    }
  
    public getBoardPlayersInfo(): Array<Player_Info> {
        return this.players_info;
    }
}