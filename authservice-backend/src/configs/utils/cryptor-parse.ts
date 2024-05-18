import {ParseHelper} from "../../utils/parse-helper";


export class CryptorParse {
    private static readonly crpytorConfig: CrpytorConfig;

    public static getCryptorConfig(): CrpytorConfig {
        this.varParse();

        return this.crpytorConfig;
    }

    private static varParse(): void {
        this.crpytorConfig.SALT_ROUNDS = ParseHelper.parseNumber(process.env.SALT_ROUNDS);
    }
}

export interface CrpytorConfig {
    SALT_ROUNDS: number;
}