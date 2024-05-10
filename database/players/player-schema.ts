import { Schema } from "mongoose";

export const PlayerSchema = new Schema({
    user_ident: {String, required: true},    
    player_login: {String, required: true},
    visible_history: {Boolean, required: true},
});