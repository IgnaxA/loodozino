import {UserDTO} from "../services/dtos/user-dto";
import {QueryConstructor} from "./queries/query-constructor";

export interface AuthRepository {
    createUser(userDTO: UserDTO): QueryConstructor;
    checkUser(userDto: UserDTO): QueryConstructor;
}