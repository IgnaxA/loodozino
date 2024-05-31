import { SettingsModel } from '../../models/settings-model';
import { SettingsRepository } from "../settings-repository";
import { ISettings } from '../../contracts/settings';
import { EditVisibleHistoryPayload } from '../../contracts/settings';


export class SettingsRepositoryImpl implements SettingsRepository {
    constructor () {};

    public async createSettings(settings: ISettings): Promise<void> {
        const settingsModel = new SettingsModel(settings);

        await settingsModel.save();
    }

    public async getSettingsByUserIdent(user_ident: String): Promise<ISettings> {
        const settings = await SettingsModel.findOne(user_ident);
        
        const settings_interface: ISettings = new SettingsModel(settings);
        return settings_interface;
    }

    public async editVisibleHistory(editVisibleHistoryPayload: EditVisibleHistoryPayload): Promise<ISettings> {
        const filter = { user_ident: editVisibleHistoryPayload.user_ident};
        const update = { visible_history: editVisibleHistoryPayload.visible_history};
        const settings = await SettingsModel.findOneAndUpdate(filter, update, {new: true});

        const settings_interface: ISettings = new SettingsModel(settings);
        return settings_interface;
    }

    public async removeSettingsByUserIdent(user_ident: String): Promise<ISettings> {
        const filter = { user_ident: user_ident};
        const settings = await SettingsModel.findOneAndDelete(filter, {user_ident: user_ident});

        const settings_interface: ISettings = new SettingsModel(settings);
        return settings_interface;
    }
}