
export class Assert {
    public static notNull(obj: any, msg: string): void {
        if (obj === null || obj === undefined) {
            throw new Error(msg);
        }
    }

    public static isError(obj: any): void {
        if (!(obj instanceof Error)) {
            throw new Error("Error occurred while parsing error");
        }
    }
}