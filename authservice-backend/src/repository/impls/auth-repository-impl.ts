import {AuthRepository} from "../auth-repository";
import {UserDTO} from "../../services/dtos/user-dto";
import {UserQueries} from "../queries/user-queries";
import {SingleQueryConstructor} from "../query-constructors/single-query-constructor";
import {TransactionRunner} from "../transaction-runners/transaction-runner";
import {QueryConstructor} from "../query-constructors/query-constructor";

export class AuthRepositoryImpl implements AuthRepository {
    private readonly transactionRunner: TransactionRunner<QueryConstructor>;
    private readonly userQueries: UserQueries;

    constructor(transactionRunner: TransactionRunner<QueryConstructor>, userQueries: UserQueries) {
        this.transactionRunner = transactionRunner;
        this.userQueries = userQueries;
    }

    public createUser(userDTO: UserDTO): void {
        const queryConstructors: Array<SingleQueryConstructor> = new Array<SingleQueryConstructor>();

        queryConstructors.push(this.userQueries.createUser(
            userDTO.getEmail(),
            userDTO.getPassword(),
            userDTO.getAccessLevel())
        );




        this.transactionRunner.run(queryConstructors);

    }

    public checkUser(userDTO: UserDTO): void {

    }
}