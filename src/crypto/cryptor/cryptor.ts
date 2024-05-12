
export interface Cryptor {
    encryptPassword(password: string): Promise<string>;
    comparePasswords(password: string, hashedPassword: string): Promise<boolean>;
}