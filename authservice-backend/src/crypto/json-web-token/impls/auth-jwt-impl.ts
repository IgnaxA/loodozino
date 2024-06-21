import {AuthJWT} from "../auth-jwt";
import jwt from "jsonwebtoken";
import {JWTConfig, JWTParse} from "../../../configs/utils/jwt-parse";
import {TokenExpiryConfig, TokenExpiryParse} from "../../../configs/utils/token-expiry-parse";
import {UserTokenDto} from "../../../services/dtos/user-token-dto";

export class AuthJWTImpl implements AuthJWT {
    private readonly jwtConfig: JWTConfig;
    private readonly tokenExpiryConfig: TokenExpiryConfig;

    constructor() {
        this.jwtConfig = JWTParse.getJWTConfig();
        this.tokenExpiryConfig = TokenExpiryParse.getTokensExpiryConfig();
    }

    public createToken(tokenType: Token, tokenDto: UserTokenDto): string {
        const tokenExpiry: number = tokenType === Token.Refresh
            ? this.tokenExpiryConfig.REFRESH_TOKEN_EXPIRY
            : this.tokenExpiryConfig.ACCESS_TOKEN_EXPIRY;

        return jwt.sign({...tokenDto}, this.jwtConfig.SECRET_WORD, {
            expiresIn: tokenExpiry
        });
    }

}

export enum Token {
    Refresh,
    Access
}