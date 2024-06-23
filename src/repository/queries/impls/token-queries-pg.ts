import {TokenQueries} from "../token-queries";
import {QueryConstructor} from "../../query-constructors/query-constructor";
import {SingleQueryConstructor} from "../../query-constructors/extendors/single-query-constructor";

export class TokenQueriesPg implements TokenQueries {
    getToken(token: string): QueryConstructor {
        return new SingleQueryConstructor();
    }

}