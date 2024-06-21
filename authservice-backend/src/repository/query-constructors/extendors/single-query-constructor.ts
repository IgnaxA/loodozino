import {QueryConstructor} from "../query-constructor";

export class SingleQueryConstructor extends QueryConstructor {

    constructor() {
        super();
    }

    public setQuery(body: string): void {
        this.query = body;
    }

    public setParameters(parameters: Array<any>): void {
        this.parameters = parameters;
    }
}