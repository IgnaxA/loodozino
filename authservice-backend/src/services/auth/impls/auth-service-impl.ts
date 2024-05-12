import {AuthService} from "../auth-service";
import {AuthControllerDTOInput} from "../../../controllers/auth/dtos/auth-controller-dto-input";
import {AuthControllerDTOOutput} from "../../../controllers/auth/dtos/auth-controller-dto-output";

export class AuthServiceImpl implements AuthService {

    public async verifyUser(authControllerDTOInput: AuthControllerDTOInput): Promise<AuthControllerDTOOutput> {
        return new AuthControllerDTOOutput("", "");
    }

    public async createUser(authControllerDTOInput: AuthControllerDTOInput): Promise<AuthControllerDTOOutput> {
        return new AuthControllerDTOOutput("", "");
    }

}