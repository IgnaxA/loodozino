export class TokenExpiryParse {
    private static readonly tokenExpiryConfig: TokenExpiryConfig;

    public static getTokensExpiryConfig(): TokenExpiryConfig {
        this.tokenExpiryConfig.REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY
            ? Number(process.env.REFRESH_TOKEN_EXPIRY)
            : 2592000;

        this.tokenExpiryConfig.ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY
            ? Number(process.env.ACCESS_TOKEN_EXPIRY)
            : 86400;

        return this.tokenExpiryConfig;
    }
}

export interface TokenExpiryConfig {
    REFRESH_TOKEN_EXPIRY: number;
    ACCESS_TOKEN_EXPIRY: number;
}