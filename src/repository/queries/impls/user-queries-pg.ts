import {SingleQueryConstructor} from "../../query-constructors/extendors/single-query-constructor";
import {Assert} from "../../../utils/assert";
import {UserQueries} from "../user-queries";

export class UserQueriesPg implements UserQueries {
    private readonly insert: string =
        "INSERT INTO users(user_email, user_password, user_access_level) VALUES($1, $2, $3);";
    private readonly withInsert: string =
        "INSERT INTO users(user_email, user_password, user_access_level) VALUES($1, $2, $3) RETURNING user_id;";
    private readonly selectByEmail: string =
        "SELECT users.user_password, users.user_access_level FROM users WHERE users.user_email = $1;";

    public createUser(email: string, password: string, accessLevel: number): SingleQueryConstructor {
        Assert.notNull(email, "User email must not be null");
        Assert.notNull(password, "User password must not be null");
        Assert.notNull(accessLevel, "User access level must not be null");

        const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

        const parameters: Array<any> = new Array<any>(email, password, accessLevel);

        queryConstructor.setQuery(this.insert);
        queryConstructor.setParameters(parameters);

        return queryConstructor;
    }

    public checkUser(email: string): SingleQueryConstructor {
        Assert.notNull(email, "User email must not be null");

        const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();

        const parameters: Array<any> = new Array<any>(email);

        queryConstructor.setQuery(this.selectByEmail);
        queryConstructor.setParameters(parameters);

        return queryConstructor;
    }
}