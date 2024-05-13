import { Action } from "./action";

export class Match {
    private board_ident: String;
    private player_amount: Number;
    private players: Array<String>;
    private actions: Array<Action>;
    
    constructor () {
        this.board_ident = "";
        this.player_amount = 0;
        this.players = new Array<String>();
        this.actions = new Array<Action>();
    }
    public setMatch(board_ident: String, player_amount: Number, players: Array<String>, actions: Array<Action>) {
        this.board_ident = board_ident;
        this.player_amount = player_amount;
        this.players = players;
        this.actions = actions;
    }
  
    public getMatchIdent(): String {
        return this.board_ident;
    }
  
    public getMatchPlayerAmount(): Number {
        return this.player_amount;
    }

    public getMatchPlayers(): Array<String> {
        return this.players;
    }

    public getMatchActions(): Array<Action> {
        return this.actions;
    }
}