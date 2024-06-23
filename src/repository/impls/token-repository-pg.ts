import {TokenRepository} from "../token-repository";

export class TokenRepositoryPg implements TokenRepository {
    public checkToken(token: string): boolean {
        return false;
    }

    insertToken(): void {
    }

}