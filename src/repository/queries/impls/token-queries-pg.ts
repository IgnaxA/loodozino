import {TokenQueries} from "../token-queries";
import {QueryConstructor} from "../../query-constructors/query-constructor";
import {SingleQueryConstructor} from "../../query-constructors/extendors/single-query-constructor";

export class TokenQueriesPg implements TokenQueries {
    private readonly selectByToken: string =
        "SELECT tokens.token_id, tokens.token_status FROM tokens WHERE tokens.token_body = $1";

    public getToken(token: string): QueryConstructor {
        const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();
        const parameters: Array<any> = new Array<any>(token);

        queryConstructor.setQuery(this.selectByToken);
        queryConstructor.setParameters(parameters);

        return queryConstructor;
    }

}