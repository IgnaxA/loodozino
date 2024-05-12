import {AuthControllerDTOInput} from "../../controllers/auth/dtos/auth-controller-dto-input";
import {AuthControllerDTOOutput} from "../../controllers/auth/dtos/auth-controller-dto-output";

export interface AuthService {
    createUser(authControllerDTOInput: AuthControllerDTOInput): Promise<AuthControllerDTOOutput>;
    verifyUser(authControllerDTOInput: AuthControllerDTOInput): Promise<AuthControllerDTOOutput>;
}