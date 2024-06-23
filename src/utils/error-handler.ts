import {Response} from "express";
import {Assert} from "./assert";

export class ErrorHandler {

    public static setError(res: Response, error: any, code: number): void {
        Assert.isError(error);

        res
            .status(code)
            .json({
                "message": error.message
            });
    }

    public static throwError(err: any, msg: string): void {
        Assert.isError(err);
        const error: Error = err as Error;
        let builder: string = msg;

        builder += err === null
            ? ""
            : "\n"
            + "Caused by:"
            + " "
            + error.message
            + "\n"
            + "With stacktrace:"
            + " "
            + error.stack;

        throw new Error(builder);
    }
}