// Запросы к бд

import { ISettings } from "../contracts/settings";
import { EditVisibleHistoryPayload } from "../contracts/settings";

export interface SettingsRepository {
    createSettings(settings: ISettings) : Promise<void>;
    getSettings(user_ident: String) : Promise<ISettings>;
    editVisibleHistory(editHistoryPayload: EditVisibleHistoryPayload) : Promise<ISettings>;
    removeSettings(user_ident: String): Promise<ISettings>;
}