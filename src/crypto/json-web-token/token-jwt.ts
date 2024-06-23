import {UserTokenDto} from "../../services/dtos/user-token-dto";
import {Token} from "./impls/auth-jwt-impl";

export interface TokenJWT {
    createToken(tokenType: Token, tokenDto: UserTokenDto): string
    verifyToken<T>(token: string): T | null;
}