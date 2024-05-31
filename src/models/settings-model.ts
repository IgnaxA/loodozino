import { Schema, model, Model} from "mongoose";
import { ISettings } from "../contracts/settings";

const SettingsSchema = new Schema<ISettings>({
    user_ident: { type: String, required: true},
    visible_history: { type: Boolean, required: true},
});

export const SettingsModel: Model<ISettings> = model<ISettings>('settings', SettingsSchema);