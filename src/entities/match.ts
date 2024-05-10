import { Player_Info } from "./player_info";

export class Match {
    private board_ident: String;
    private players_info: Array<Player_Info>;
    
    constructor () {
        this.board_ident = "";
        this.players_info = new Array<Player_Info>;
    }
    public setMatch(board_ident: String, players_info: Array<Player_Info>) {
        this.board_ident = board_ident;
        this.players_info = players_info;
    }
  
    public getMatchIdent(): String {
        return this.board_ident;
    }
  
    public getMatchPlayersInfo(): Array<Player_Info> {
        return this.players_info;
    }
}