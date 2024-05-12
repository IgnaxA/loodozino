import {Token} from "./impls/auth-jwt-impl";

export interface AuthJWT {
    createToken(userData: string[], tokenType: Token): string;
}