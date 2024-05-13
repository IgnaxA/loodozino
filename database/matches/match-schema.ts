import { Schema } from "mongoose";

export const MatchSchema = new Schema({
    board_ident: {String, required: true},
    player_amount: {Number, required: true},
    players: 
    [
        {String, required: true}
    ],
    actions: 
    [
        {
            login: {String, required: true},
            action_type: {String, required: true},
            bet: {Number}
        }
    ]
});