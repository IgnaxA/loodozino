import {UserDTO} from "../../services/dtos/user-dto";
import {SingleQueryConstructor} from "../query-constructors/extendors/single-query-constructor";

export interface UserQueries {
    createUser(email: string, password: string, accessLevel: number): SingleQueryConstructor;
    checkUser(email: string): SingleQueryConstructor;
}