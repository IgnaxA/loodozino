import {Assert} from "./assert";

export class ParseHelper {
    private static readonly booleanVal: Map<string, boolean> = new Map([["true", true], ["false", false]]);
    private static readonly notNullOrUndefinedMessage: string = "Value must not be null";

    public static parseBoolean(val: any): boolean {
        Assert.notNullOrUndefined(val, this.notNullOrUndefinedMessage);
        Assert.isBoolean(val);

        const actVal: boolean | undefined = this.booleanVal.get(<string>val);

        Assert.notNull(actVal, "Error occurred while parsing boolean");

        return <boolean>actVal;
    }

    public static parseString(val: any): string {
        Assert.notNullOrUndefined(val, this.notNullOrUndefinedMessage);
        Assert.isString(val);

        return <string>val;
    }

    public static parseNumber(val: any): number {
        Assert.notNullOrUndefined(val, this.notNullOrUndefinedMessage);
        Assert.isNumber(val);

        return <number>val;
    }
}