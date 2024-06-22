import {Token} from "./impls/auth-jwt-impl";

export interface AuthJWT {
    createToken(tokenType: Token, ...userData: any[]): string;
}