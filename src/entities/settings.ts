import { ISettings } from "../contracts/settings";

export class Settings {
    private user_ident: String;
    private visible_history: Boolean;
    
    constructor() {
        this.user_ident = "";
        this.visible_history = true;
    }
    
    public setSettingsByProps(user_ident: String, visible_history: Boolean): Settings {
        this.user_ident = user_ident;
        this.visible_history = visible_history;

        return this;
    }

    public setSettingsByInterface(settings: ISettings): Settings {
        this.user_ident = settings.user_ident as string;
        this.visible_history = settings.visible_history;

        return this;
    }
  
    public getUserIdent(): String {
        return this.user_ident;
    }
  
    public getUserHistoryVisibility(): Boolean {
        return this.visible_history;
    }
}

