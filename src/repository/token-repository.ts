import {CheckTokenResponse} from "./impls/token-repository-pg";

export interface TokenRepository {
    checkToken(token: string): Promise<CheckTokenResponse>;
    insertToken(): void;
}