

export class CryptorParse {
    private static readonly crpytorConfig: CrpytorConfig;

    public static getCryptorConfig(): CrpytorConfig {
        this.crpytorConfig.SALT_ROUNDS = process.env.SALT_ROUNDS
            ? Number(process.env.SALT_ROUNDS)
            : 10;

        return this.crpytorConfig;
    }
}

export interface CrpytorConfig {
    SALT_ROUNDS: number;
}