import { SettingsModel } from '../../models/settings-model';
import { SettingsRepository } from "../settings-repository";
import { ISettings } from '../../contracts/settings';
import { EditVisibleHistoryPayload } from '../../contracts/settings';
import { Assert } from '../../utils/assert';


export class SettingsRepositoryImpl implements SettingsRepository {
    constructor () {};

    public async createSettings(settings: ISettings): Promise<void> {
        const settingsModel = new SettingsModel(settings);

        await settingsModel.save();
    }

    public async getSettings(user_ident: String): Promise<ISettings> {
        const settings = await SettingsModel.findOne(user_ident);

        Assert.notNullOrUndefined(settings, "This settings do not exist");

        const settingsInterface: ISettings = new SettingsModel(settings);
        return settingsInterface;
    }

    public async editVisibleHistory(editVisibleHistoryPayload: EditVisibleHistoryPayload): Promise<ISettings> {
        const filter = { user_ident: editVisibleHistoryPayload.user_ident};
        const update = { visible_history: editVisibleHistoryPayload.visible_history};
        const settings = await SettingsModel.findOneAndUpdate(filter, update, {new: true});

        Assert.notNullOrUndefined(settings, "This settings do not exist");

        const settingsInterface: ISettings = new SettingsModel(settings);
        return settingsInterface;
    }

    public async removeSettings(user_ident: String): Promise<ISettings> {
        const settings = await SettingsModel.findOneAndDelete(user_ident);

        Assert.notNullOrUndefined(settings, "This settings do not exist");

        const settingsInterface: ISettings = new SettingsModel(settings);
        return settingsInterface;
    }
}