import { Schema } from "mongoose";

export const MatchSchema = new Schema({
    match_ident: {String, required: true},
    board_ident: {String, required: true},
    user_count: {Number, required: true},
    users: 
    [
        {String}
    ],
    actions: 
    [
        {
            user_login: {String},
            action_type: {String},
            bet_size: {Number}
        }
    ]
});