import {TokenRepository} from "../token-repository";
import {TokenQueries} from "../queries/token-queries";
import {QueryConstructor} from "../query-constructors/query-constructor";
import {TransactionRunner} from "../transaction-runners/transaction-runner";

export class TokenRepositoryPg implements TokenRepository {
    private readonly transactionRunner: TransactionRunner<QueryConstructor>;
    private readonly tokenQueries: TokenQueries;

    constructor(transactionRunner: TransactionRunner<QueryConstructor>, tokenQueries: TokenQueries) {
        this.transactionRunner = transactionRunner;
        this.tokenQueries = tokenQueries;
    }

    public async checkToken(token: string): Promise<CheckTokenResponse> {
        const queryConstructor: QueryConstructor = this.tokenQueries.getToken(token);

        const response: CheckTokenResponse = await this.transactionRunner.runSingle<CheckTokenResponse>(queryConstructor);

        return response;
    }

    insertToken(): void {
    }

}

export interface CheckTokenResponse {
    token_id: number;
    token_status: boolean;
}