import {Assert} from "./assert";

export class ParseHelper {
    private static readonly booleanVal: Map<string, boolean> = new Map([["true", true], ["false", false]]);
    private static readonly notNullOrUndefinedMessage: string = "Value must not be null";

    public static parseBoolean(val: any): boolean {
        Assert.notNullOrUndefined(val, this.notNullOrUndefinedMessage);

        const actVal: boolean | undefined = this.booleanVal.get(<string>val);

        Assert.notNullOrUndefined(actVal, "Error occurred while parsing boolean");

        return Boolean(actVal);
    }

    public static parseString(val: any): string {
        Assert.notNullOrUndefined(val, this.notNullOrUndefinedMessage);

        return String(val);
    }

    public static parseNumber(val: any): number {
        Assert.notNullOrUndefined(val, this.notNullOrUndefinedMessage);
        Assert.isNumber(val);

        return Number(val);
    }
}