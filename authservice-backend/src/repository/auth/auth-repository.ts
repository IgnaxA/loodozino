import {UserDTO} from "../../services/auth/dtos/user-dto";

export interface AuthRepository {
    createUser(userDTO: UserDTO): Promise<boolean>;
    updateUserRefreshToken(refreshToken: string, oldRefreshToken: string): Promise<boolean>;
}