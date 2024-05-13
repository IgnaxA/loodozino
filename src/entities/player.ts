export class Player {
    private user_ident: String;
    private player_login: String;
    private visible_history: Boolean;
    
    constructor() {
        this.user_ident = "";
        this.player_login = "";
        this.visible_history = true;
    }
    
    public setPlayer(user_ident: String, player_login: String, visible_history: Boolean) {
        this.user_ident = user_ident;
        this.player_login = player_login;
        this.visible_history = visible_history;
    }
  
    public getPlayerIdent(): String {
        return this.user_ident;
    }
  
    public getPlayerLogin(): String {
        return this.player_login;
    }
  
    public getPlayerHistoryVisibility(): Boolean {
        return this.visible_history;
    }
}

