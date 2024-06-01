// ВСЯ Работа с данными (из контроллера)

import { EditVisibleHistoryPayload, ISettings } from "../contracts/settings";

export interface SettingsService {
    createSettings(settings: ISettings) : Promise<void>;
    getSettings(user_ident: string): Promise<ISettings>;
    editVisibleHistory(editHistoryPayload: EditVisibleHistoryPayload): Promise<ISettings>;
    removeSettings(user_ident: string): Promise<ISettings>;
}