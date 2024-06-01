import { Schema } from "mongoose";

export const MatchSchema = new Schema({
    board_ident: {String, required: true},
    created_at: {Date, required: true},
    board_name: {String, required: true}
});