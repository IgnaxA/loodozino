import * as Mongoose from "mongoose";

const MatchSchema = new Mongoose.Schema({
    board_ident: {String, required: true},
    players_info: [
        {
            player_login: {String},
            hand: {Array},
            bets: {Array},
        }
      ]
});

export default MatchSchema;