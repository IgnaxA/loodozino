import {Cryptor} from "../cryptor";
import {CryptorParse, CrpytorConfig} from "../../../configs/cryptor-parse";
import bcrypt from "bcrypt";
import {Assert} from "../../../handlers/assert";

export class CryptorImpl implements Cryptor {
    private readonly saltRounds: number;

    constructor() {
        const cryptorConfig: CrpytorConfig = CryptorParse.getCryptorConfig();
        this.saltRounds = cryptorConfig.SALT_ROUNDS;
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
            .hash(password, this.saltRounds);
    }
}