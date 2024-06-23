import {TokenRepository} from "../token-repository";

export class TokenRepositoryPg implements TokenRepository {
    checkToken(token: string): boolean {
        return false;
    }

    insertToken(): void {
    }

}