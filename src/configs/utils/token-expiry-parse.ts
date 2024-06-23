import {ParseHelper} from "../../utils/parse-helper";

export class TokenExpiryParse {
    private static readonly tokenExpiryConfig: TokenExpiryConfig = {} as TokenExpiryConfig;

    public static getTokensExpiryConfig(): TokenExpiryConfig {
        this.varParse();

        return this.tokenExpiryConfig;
    }

    private static varParse(): void {
        this.tokenExpiryConfig.REFRESH_TOKEN_EXPIRY = ParseHelper.parseNumber(process.env.REFRESH_TOKEN_EXPIRY);

        this.tokenExpiryConfig.ACCESS_TOKEN_EXPIRY = ParseHelper.parseNumber(process.env.ACCESS_TOKEN_EXPIRY);
    }
}

export interface TokenExpiryConfig {
    REFRESH_TOKEN_EXPIRY: number;
    ACCESS_TOKEN_EXPIRY: number;
}