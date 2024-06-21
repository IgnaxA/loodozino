import {UserDTO} from "../services/dtos/user-dto";
import {SingleQueryConstructor} from "./query-constructors/extendors/single-query-constructor";

export interface AuthRepository {
    createUser(userDTO: UserDTO): void;
    checkUser(userDto: UserDTO): void;
}