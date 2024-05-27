
export class QueryConstructor {
    private query: string;
    private parameters: Array<any>;

    constructor() {
        this.query = "";
        this.parameters = new Array<any>();
    }

    public getQuery(): string {
        return this.query;
    }

    public getParameters(): Array<any> {
        return this.parameters;
    }

    public setQuery(body: string): void {
        this.query = body;
    }

    public setParameters(parameters: Array<any>): void {
        this.parameters = parameters;
    }
}