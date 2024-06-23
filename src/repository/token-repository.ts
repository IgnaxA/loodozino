
export interface TokenRepository {
    checkToken(token: string): boolean;
    insertToken(): void;
}