import {Response} from "express";
import {Assert} from "./assert";

export class ErrorHandler {

    public static setError(res: Response, error: any): void {
        Assert.isError(error);

        res
            .status(500)
            .json({
                "message": error.message
            });
    }
}