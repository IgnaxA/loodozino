
import {QueryConstructor} from "../query-constructors/query-constructor";

export interface TokenQueries {
    getToken(token: string): QueryConstructor;
}