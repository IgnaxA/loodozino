import * as Mongoose from "mongoose";

const MatchSchema = new Mongoose.Schema({
    board_ident: {String, required: true},
    created_at: {Date, required: true},
    board_name: {String, required: true}
});

export default MatchSchema;