
export abstract class QueryConstructor {
    protected query: string;
    protected parameters: Array<any>;

    protected constructor() {
        this.query = "";
        this.parameters = new Array<any>();
    }

    public getQuery(): string {
        return this.query;
    }

    public getParameters(): Array<any> {
        return this.parameters;
    }
}