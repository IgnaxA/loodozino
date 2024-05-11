import {Response} from "express";

export class ErrorHandler {

    public static setError(res: Response, error: any): void {
        if (!(error instanceof Error)) {
            throw new Error("Error occurred while parsing error");
        }

        res
            .status(500)
            .json({
                "message": error.message
            });
    }
}