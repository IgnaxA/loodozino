import {AuthJWT} from "../auth-jwt";
import jwt from "jsonwebtoken";
import {JWTConfig, JWTParse} from "../../../configs/jwt-parse";
import {TokenExpiryConfig, TokenExpiryParse} from "../../../configs/token-expiry-parse";

export class AuthJWTImpl implements AuthJWT {
    private readonly secretWord: string;
    private readonly refreshTokenExpiry: number;
    private readonly accessTokenExpiry: number;

    constructor() {
        const jwtConfig: JWTConfig = JWTParse.getJWTConfig();
        const tokenExpiryConfig: TokenExpiryConfig = TokenExpiryParse.getTokensExpiryConfig();

        this.secretWord = jwtConfig.SECRET_WORD;
        this.refreshTokenExpiry = tokenExpiryConfig.REFRESH_TOKEN_EXPIRY;
        this.accessTokenExpiry = tokenExpiryConfig.ACCESS_TOKEN_EXPIRY;
    }

    public createToken(userData: string[], tokenType: Token): string {
        const tokenExpiry: number = tokenType === Token.Refresh
            ? this.refreshTokenExpiry
            : this.accessTokenExpiry;

        return jwt.sign(userData, this.secretWord, {
            expiresIn: tokenExpiry
        });
    }

}

export enum Token {
    Refresh,
    Access
}