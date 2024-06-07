import {QueryConstructor} from "./query-constructor";

export class SingleQueryConstructor extends QueryConstructor {
    private query: string;
    private parameters: Array<any>;

    constructor() {
        super();
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