import {AuthJWT} from "../auth-jwt";
import jwt from "jsonwebtoken";
import {JWTConfig, JWTParse} from "../../../configs/utils/jwt-parse";
import {TokenExpiryConfig, TokenExpiryParse} from "../../../configs/utils/token-expiry-parse";

export class AuthJWTImpl implements AuthJWT {
    private readonly jwtConfig: JWTConfig;
    private readonly tokenExpiryConfig: TokenExpiryConfig;

    constructor() {
        this.jwtConfig = JWTParse.getJWTConfig();
        this.tokenExpiryConfig = TokenExpiryParse.getTokensExpiryConfig();
    }

    public createToken(userData: string[], tokenType: Token): string {
        const tokenExpiry: number = tokenType === Token.Refresh
            ? this.tokenExpiryConfig.REFRESH_TOKEN_EXPIRY
            : this.tokenExpiryConfig.ACCESS_TOKEN_EXPIRY;

        return jwt.sign(userData, this.jwtConfig.SECRET_WORD, {
            expiresIn: tokenExpiry
        });
    }

}

export enum Token {
    Refresh,
    Access
}