import { SettingsRepository } from "../../repositories/settings-repository";
import { ISettings } from "../../contracts/settings";
import { EditVisibleHistoryPayload } from "../../contracts/settings";
import { SettingsRepositoryImpl } from "../../repositories/implementations/settings-repository-impl";
import { SettingsService } from "../settings-service";

export class SettingsServiceImpl implements SettingsService {
    private readonly settingsRepository: SettingsRepository;

    constructor (settingsRepository: SettingsRepository) {
        this.settingsRepository = settingsRepository;
    }
    
    public async createSettings(settings: ISettings) : Promise<void> {
        await this.settingsRepository.createSettings(settings);
    }

    public async getSettingsByUserIdent(user_ident: string): Promise<ISettings> {
        // check na user_ident == null
        return await this.settingsRepository.getSettingsByUserIdent(user_ident);
    }
    public async editVisibleHistory(editHistoryPayload: EditVisibleHistoryPayload): Promise<ISettings>{
        return await this.settingsRepository.editVisibleHistory(editHistoryPayload);
    }
    public async removeSettingsByUserIdent(user_ident: string): Promise<ISettings>{
        // check na user_ident == null
        return await this.settingsRepository.removeSettingsByUserIdent(user_ident);
    }
}