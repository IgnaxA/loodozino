// ВСЯ Работа с данными (из контроллера)

import { EditVisibleHistoryPayload, ISettings } from "../contracts/settings";

export interface SettingsService {
    createSettings(settings: ISettings) : Promise<void>;
    getSettingsByUserIdent(user_ident: string): Promise<ISettings>;
    editVisibleHistory(editHistoryPayload: EditVisibleHistoryPayload): Promise<ISettings>;
    removeSettingsByUserIdent(user_ident: string): Promise<ISettings>;
}