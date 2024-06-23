import {QueryConstructor} from "../query-constructors/query-constructor";

export interface UserQueries {
    createUser(email: string, password: string, accessLevel: number): QueryConstructor;
    checkUser(email: string): QueryConstructor;
}