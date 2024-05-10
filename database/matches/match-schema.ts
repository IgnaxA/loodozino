import { Schema } from "mongoose";

export const MatchSchema = new Schema({
    board_ident: {String, required: true},
    players_info: [
        {
            player_login: {String},
            hand: {Array},
            bets: {Array},
        }
      ]
});