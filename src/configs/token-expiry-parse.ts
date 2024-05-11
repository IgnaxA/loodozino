export class TokenExpiryParse {
    private static readonly tokensExpiry: TokensExpiry;

    public static getTokensExpiry(): TokensExpiry {
        this.tokensExpiry.refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY
            ? Number(process.env.REFRESH_TOKEN_EXPIRY)
            : 2592000;

        this.tokensExpiry.accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY
            ? Number(process.env.ACCESS_TOKEN_EXPIRY)
            : 86400;

        return this.tokensExpiry;
    }
}

export interface TokensExpiry {
    refreshTokenExpiry: number;
    accessTokenExpiry: number;
}