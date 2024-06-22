
export interface Cryptor {
    encrypt(data: string): Promise<string>;
    compare(data: string, hashedData: string): Promise<boolean>;
}