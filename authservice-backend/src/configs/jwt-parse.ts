
export class JWTParse {
    private static readonly jwtConfig: JWTConfig;

    public static getJWTConfig(): JWTConfig {
        this.jwtConfig.SECRET_WORD = process.env.SECRET_WORD
            ? String(process.env.SECRET_WORD)
            : "";

        return this.jwtConfig;
    }
}

export interface JWTConfig {
    SECRET_WORD: string;
}