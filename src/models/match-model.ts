import { model, Model, Schema } from "mongoose";
import { IMatch } from "../contracts/match";

const MatchSchema = new Schema({
    match_ident: {type: String, required: true},
    board_ident: {type: String, required: true},
    user_count: {type: Number, required: true},
    users: 
    [
        {type: String}
    ],
    actions: 
    [
        {
            user_ident: {type: String},
            action_type: {type: String},
            bet_size: {type: Number}
        }
    ],
    match_results:
    [
        {
            user_ident: {type: String},
            chips_difference: {type: Number}
        }
    ]
});

export const MatchModel: Model<IMatch> = model<IMatch>('matches', MatchSchema);