import {ParseHelper} from "../../utils/parse-helper";


export class CryptorParse {
    private static readonly crpytorConfig: CryptorConfig = {} as CryptorConfig;

    public static getCryptorConfig(): CryptorConfig {
        this.varParse();

        return this.crpytorConfig;
    }

    private static varParse(): void {
        this.crpytorConfig.SALT_ROUNDS = ParseHelper.parseNumber(process.env.SALT_ROUNDS);
    }
}

export interface CryptorConfig {
    SALT_ROUNDS: number;
}