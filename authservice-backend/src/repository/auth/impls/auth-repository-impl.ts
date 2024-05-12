import { UserDTO } from "../../../services/auth/dtos/user-dto";
import {AuthRepository} from "../auth-repository";

export class AuthRepositoryImpl implements AuthRepository {
    public createUser(userDTO: UserDTO): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    public updateUserRefreshToken(refreshToken: string, oldRefreshToken: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}