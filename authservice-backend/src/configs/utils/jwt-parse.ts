import {ParseHelper} from "../../utils/parse-helper";

export class JWTParse {
    private static readonly jwtConfig: JWTConfig;

    public static getJWTConfig(): JWTConfig {
        this.varParse();

        return this.jwtConfig;
    }

    private static varParse(): void {
        this.jwtConfig.SECRET_WORD = ParseHelper.parseString(process.env.SECRET_WORD);
    }
}

export interface JWTConfig {
    SECRET_WORD: string;
}