import {AuthService} from "../auth-service";
import {AuthControllerDTOInput} from "../../controllers/dtos/auth-controller-dto-input";
import {AuthControllerDTOOutput} from "../../controllers/dtos/auth-controller-dto-output";
import {Cryptor} from "../../crypto/cryptor/cryptor";
import {AuthJWT} from "../../crypto/json-web-token/auth-jwt";

export class AuthServiceImpl implements AuthService {
    private readonly cryptor: Cryptor;
    private readonly authJWT: AuthJWT;

    constructor(cryptor: Cryptor, authJWT: AuthJWT) {
        this.cryptor = cryptor;
        this.authJWT = authJWT;
    }

    public async verifyUser(authControllerDTOInput: AuthControllerDTOInput): Promise<AuthControllerDTOOutput> {
        return new AuthControllerDTOOutput("", "");
    }

    public async createUser(authControllerDTOInput: AuthControllerDTOInput): Promise<AuthControllerDTOOutput> {
        return new AuthControllerDTOOutput("", "");
    }

}