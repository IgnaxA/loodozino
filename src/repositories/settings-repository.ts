// Запросы к бд

import { ISettings } from "../contracts/settings";
import { EditVisibleHistoryPayload } from "../contracts/settings";

export interface SettingsRepository {
    createSettings(settings: ISettings) : Promise<void>;
    getSettingsByUserIdent(user_ident: String) : Promise<ISettings>;
    editVisibleHistory(editHistoryPayload: EditVisibleHistoryPayload) : Promise<ISettings>;
    removeSettingsByUserIdent(user_ident: String): Promise<ISettings>;
}