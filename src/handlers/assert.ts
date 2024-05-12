
export class Assert {
    public static notNull(obj: any, msg: string): void {
        if (obj === null || obj === undefined) {
            throw new Error(msg);
        }
    }
}