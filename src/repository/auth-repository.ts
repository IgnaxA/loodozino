import {UserDTO} from "../services/dtos/user-dto";
import {SingleQueryConstructor} from "./query-constructors/extendors/single-query-constructor";
import {VerifyResponse} from "./impls/auth-repository-pg";

export interface AuthRepository {
    createUser(userDTO: UserDTO): void;
    checkUser(userDto: UserDTO): Promise<VerifyResponse>;
}