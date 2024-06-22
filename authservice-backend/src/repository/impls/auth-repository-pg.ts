import {AuthRepository} from "../auth-repository";
import {UserDTO} from "../../services/dtos/user-dto";
import {UserQueries} from "../queries/user-queries";
import {TransactionRunner} from "../transaction-runners/transaction-runner";
import {QueryConstructor} from "../query-constructors/query-constructor";
import {WithQueryConstructor} from "../query-constructors/extendors/with-query-constructor";
import {Insert} from "../query-constructors/utils/extendors/insert";
import {
    ValuesInsertPredicate
} from "../query-constructors/utils/extendors/insert-predicate/extendors/values-insert-predicate";
import {
    LinkedInsertPredicate
} from "../query-constructors/utils/extendors/insert-predicate/extendors/linked-insert-predicate";
import {WithQuery} from "../query-constructors/utils/with-query";
import {Table} from "../query-constructors/utils/table";

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
        transaction.addWith(this.createDeviceWithQuery(userDTO.getIp(), userDTO.getDevice(), userDTO.getAuthorizeDate()));
        transaction.addWith(this.createTokenWithQuery(userDTO.getRefreshToken(), 1));
        transaction.addWith(this.createUserLinkDevice());
        transaction.addWith(this.createDeviceLinkToken());

        transaction.interpret();
        this.transactionRunner.run(new Array<QueryConstructor>(transaction));
    }

    private createUserWithQuery(...userAttrs: Array<any>): WithQuery {
        const predicate: ValuesInsertPredicate = new ValuesInsertPredicate(userAttrs);
        const query: Insert = new Insert(Table.User, Table.User.getId(), predicate);

        return query;
    }

    private createDeviceWithQuery(...deviceAttrs: Array<any>): WithQuery {
        const predicate: ValuesInsertPredicate = new ValuesInsertPredicate(deviceAttrs);
        const query: Insert = new Insert(Table.Device, Table.Device.getId(), predicate);

        return query;
    }

    private createTokenWithQuery(...tokenAttrs: Array<any>): WithQuery {
        const predicate: ValuesInsertPredicate = new ValuesInsertPredicate(tokenAttrs);
        const query: Insert = new Insert(Table.Token, Table.Token.getId(), predicate);

        return query;
    }

    private createUserLinkDevice(): WithQuery {
        const predicate: LinkedInsertPredicate = new LinkedInsertPredicate(Table.User, Table.Device);
        const query: Insert = new Insert(Table.UserLinkDevice, Table.UserLinkDevice.getId(), predicate);

        return query;
    }

    private createDeviceLinkToken(): WithQuery {
        const predicate: LinkedInsertPredicate = new LinkedInsertPredicate(Table.Device, Table.Token);
        const query: Insert = new Insert(Table.DeviceLinkToken, Table.DeviceLinkToken.getId(), predicate);

        return query;
    }


    public checkUser(userDTO: UserDTO): void {

    }
}