
import { Action, MatchResult } from "../contracts/match";

export class Match {
    private match_ident: String;
    private board_ident: String;
    private user_count: number;
    private users: Array<String>;
    private actions: Array<Action>;
    private match_results: Array<MatchResult>;
    
    constructor () {
        this.match_ident = "";
        this.board_ident = "";
        this.user_count = 0;
        this.users = new Array<String>();
        this.actions = new Array<Action>();
        this.match_results = new Array<MatchResult>();
    }

    public setMatch(match_ident: String, board_ident: String, user_count: number, users:Array<String>, actions: Array<Action>, match_results: Array<MatchResult>) {
        this.match_ident = match_ident;
        this.board_ident = board_ident;
        this.user_count = user_count;
        this.users = users;
        this.actions = actions;
        this.match_results = match_results;
    }

    public getMatchIdent(): String {
        return this.match_ident;
    }

    public getMatchBoardIdent(): String {
        return this.board_ident;
    }

    public getMatchUserCount(): number {
        return this.user_count;

    }

    public getMatchUsers(): Array<String> {
        return this.users;
    }

    public getMatchActions(): Array<Action> {
        return this.actions;
    }

    public getMatchResults() : Array<MatchResult> {
        return this.match_results;
    }
  
}