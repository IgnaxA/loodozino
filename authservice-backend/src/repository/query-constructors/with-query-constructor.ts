import {QueryConstructor} from "./query-constructor";


export class WithQueryConstructor extends QueryConstructor {

    getParameters(): Array<any> {
        return new Array<any>();
    }

    getQuery(): string {
        return "";
    }

    setParameters(parameters: Array<any>): void {
    }

    setQuery(body: string): void {
    }

}