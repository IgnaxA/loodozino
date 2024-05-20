import {Cryptor} from "../cryptor";
import {CryptorParse, CryptorConfig} from "../../../configs/utils/cryptor-parse";
import bcrypt from "bcrypt";
import {Assert} from "../../../utils/assert";

export class CryptorImpl implements Cryptor {
    private readonly cryptorConfig: CryptorConfig;

    constructor() {
        this.cryptorConfig = CryptorParse.getCryptorConfig();
    }

    public async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
        Assert.notNull(password, "Inputted password must not be null");
        Assert.notNull(hashedPassword, "Hashed password must not be null");

        return await bcrypt
            .compare(password, hashedPassword);
    }

    public async encryptPassword(password: string): Promise<string> {
        Assert.notNull(password, "Inputted password must not be null");

        return await bcrypt
            .hash(password, this.cryptorConfig.SALT_ROUNDS);
    }
}