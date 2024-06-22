import {Cryptor} from "../cryptor";
import {CryptorParse, CryptorConfig} from "../../../configs/utils/cryptor-parse";
import bcrypt from "bcrypt";
import {Assert} from "../../../utils/assert";

export class CryptorImpl implements Cryptor {
    private readonly cryptorConfig: CryptorConfig;

    constructor() {
        this.cryptorConfig = CryptorParse.getCryptorConfig();
    }

    public async compare(data: string, hashedData: string): Promise<boolean> {
        Assert.notNull(data, "Inputted password must not be null");
        Assert.notNull(hashedData, "Hashed password must not be null");

        return await bcrypt
            .compare(data, hashedData);
    }

    public async encrypt(data: string): Promise<string> {
        Assert.notNull(data, "Inputted password must not be null");

        return await bcrypt
            .hash(data, this.cryptorConfig.SALT_ROUNDS);
    }
}