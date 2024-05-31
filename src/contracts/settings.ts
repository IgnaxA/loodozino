export interface ISettings extends Document{
    user_ident: String;
    visible_history: Boolean;
}

export interface EditVisibleHistoryPayload {
    user_ident: String;
    visible_history: Boolean;
}