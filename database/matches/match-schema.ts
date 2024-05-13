import { Schema } from "mongoose";

export const MatchSchema = new Schema({
    match_ident: {String, required: true},
    board_ident: {String, required: true},
    player_amount: {Number, required: true},
    players: 
    [
        {String, required: true}
    ],
    actions: 
    [
        {
            player_login: {String, required: true},
            action_type: {String, required: true},
            bet_size: {Number}
        }
    ]
});