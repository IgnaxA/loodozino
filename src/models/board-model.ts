import { model, Model, Schema } from "mongoose";
import { IBoard } from "../contracts/board";

const BoardSchema = new Schema<IBoard>({
    board_ident: {type: String, required: true},
    created_at: {type: Date, required: true},
    board_name: {type: String, required: true},
});

export const BoardModel: Model<IBoard> = model<IBoard>('boards', BoardSchema);