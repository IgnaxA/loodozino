export class Assert {
    public static notNull(obj: any, msg: string): void {
        if (obj === null) {
            throw new Error(msg);
        }
    }

    public static notNullOrUndefined(obj: any, msg: string): void {
        if (obj === null || obj === undefined) {
            throw new Error(msg);
        }
    }

    public static isBoolean(obj: any): void {
        if (!(obj instanceof Boolean)) {
            throw new Error("Object is not a bool");
        }
    }
    public static isString(obj: any): void {
        if (!(obj instanceof String)) {
            throw new Error("Object is not a string");
        }
    }

    public static isNumber(obj: any): void {
        if (Number.isNaN(obj)) {
            throw new Error("Object is not a number");
        }
    }

    public static isError(obj: any): void {
        if (!(obj instanceof Error)) {
            throw new Error("Error occurred while parsing error");
        }
    }
}