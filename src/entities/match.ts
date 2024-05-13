import { Action } from "./action";

export class Match {
    private match_ident: String;
    private board_ident: String;
    private player_count: number;
    private players: Array<String>;
    private actions: Array<Action>;
    
    constructor () {
        this.match_ident = "";
        this.board_ident = "";
        this.player_count = 0;
        this.players = new Array<String>();
        this.actions = new Array<Action>();
    }

    public setMatch(match_ident: String, board_ident: String, player_count: number, players:Array<String>, actions: Array<Action>) {
        this.match_ident = match_ident;
        this.board_ident = board_ident;
        this.player_count = player_count;
        this.players = players;
        this.actions = actions;
    }

    public getMatchIdent(): String {
        return this.match_ident;
    }

    public getMatchBoardIdent(): String {
        return this.board_ident;
    }

    public getMatchPlayerCount(): number {
        return this.player_count;
    }

    public getMatchPlayers(): Array<String> {
        return this.players;
    }

    public getMatchActions(): Array<Action> {
        return this.actions;
    }
  
}