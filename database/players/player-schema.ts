import * as Mongoose from "mongoose";

const PlayerSchema = new Mongoose.Schema({
    user_ident: {String, required: true},    
    player_login: {String, required: true},
    visible_history: {Boolean, required: true},
});

export default PlayerSchema;