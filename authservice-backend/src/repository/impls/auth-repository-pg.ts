import {AuthRepository} from "../auth-repository";
import {UserDTO} from "../../services/dtos/user-dto";
import {UserQueries} from "../queries/user-queries";
import {TransactionRunner} from "../transaction-runners/transaction-runner";
import {QueryConstructor} from "../query-constructors/query-constructor";
import {WithQueryConstructor} from "../query-constructors/extendors/with-query-constructor";
import {Table, WithQuery} from "../query-constructors/utils/with-query";
import {Insert} from "../query-constructors/utils/extendors/insert";
import {InsertPredicate} from "../query-constructors/utils/extendors/insert-predicate/insert-predicate";
import {
    ValuesInsertPredicate
} from "../query-constructors/utils/extendors/insert-predicate/extendors/values-insert-predicate";

export class AuthRepositoryPg implements AuthRepository {
    private readonly transactionRunner: TransactionRunner<QueryConstructor>;
    private readonly userQueries: UserQueries;

    constructor(transactionRunner: TransactionRunner<QueryConstructor>, userQueries: UserQueries) {
        this.transactionRunner = transactionRunner;
        this.userQueries = userQueries;
    }

    public createUser(userDTO: UserDTO): void {

        const transaction: WithQueryConstructor = new WithQueryConstructor();

        transaction.addWith(this.createUserWithQuery(userDTO.getEmail(), userDTO.getPassword(), userDTO.getAccessLevel()));

        transaction.interpret();
        this.transactionRunner.run(new Array<QueryConstructor>(transaction));

    }

    private createUserWithQuery(...userAttrs: any): WithQuery {
        const predicate: InsertPredicate = new ValuesInsertPredicate(userAttrs);
        const query: Insert = new Insert(Table.User, predicate);

        return query;
    }

    private createDeviceWithQuery(...deviceAttrs)



    public checkUser(userDTO: UserDTO): void {

    }
}