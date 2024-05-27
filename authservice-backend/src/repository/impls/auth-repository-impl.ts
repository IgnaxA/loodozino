import { UserDTO } from "../../services/dtos/user-dto";
import {AuthRepository} from "../auth-repository";
import {QueryConstructor} from "../queries/query-constructor";
import {Assert} from "../../utils/assert";

export class AuthRepositoryImpl implements AuthRepository {
    public createUser(userDto: UserDTO): QueryConstructor {
        this.validateDto(userDto);

        const queryConstructor: QueryConstructor = new QueryConstructor();
        const email: string = userDto.getEmail();
        const password: string = userDto.getPassword();
        const accessLevel: number = userDto.getAccessLevel();

        const query: string = "INSERT INTO users(user_email, user_password, user_access_level) VALUES ($1, $2, $3);";
        const parameters: Array<any> = new Array<any>(email, password, accessLevel);

        queryConstructor.setQuery(query);
        queryConstructor.setParameters(parameters);

        return queryConstructor;
    }

    public checkUser(userDto: UserDTO): QueryConstructor {
        Assert.notNull(userDto.getEmail(), "User email must not be null");

        const queryConstructor: QueryConstructor = new QueryConstructor();
        const email: string = userDto.getEmail();

        const query: string = "SELECT users.user_password FROM users WHERE users.user_email = $1;";
        const parameters: Array<any> = new Array<any>(userDto.getEmail());

        queryConstructor.setQuery(query);
        queryConstructor.setParameters(parameters);

        return queryConstructor;
    }

    private validateDto(userDto: UserDTO): void {
        Assert.notNull(userDto.getEmail(), "User email must not be null");
        Assert.notNull(userDto.getPassword(), "User password must not be null");
        Assert.notNull(userDto.getAccessLevel(), "User access level must not be null");
    }
}