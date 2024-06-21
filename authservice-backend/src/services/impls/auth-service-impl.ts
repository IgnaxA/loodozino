import {AuthService} from "../auth-service";
import {AuthControllerDTOInput} from "../../controllers/dtos/auth-controller-dto-input";
import {AuthControllerDTOOutput} from "../../controllers/dtos/auth-controller-dto-output";
import {Cryptor} from "../../crypto/cryptor/cryptor";
import {AuthJWT} from "../../crypto/json-web-token/auth-jwt";
import {AuthRepository} from "../../repository/auth-repository";
import {Token} from "../../crypto/json-web-token/impls/auth-jwt-impl";
import {UserDTO} from "../dtos/user-dto";
import {UserTokenDto} from "../dtos/user-token-dto";

export class AuthServiceImpl implements AuthService {
    private readonly cryptor: Cryptor;
    private readonly authJWT: AuthJWT;
    private readonly authRepository: AuthRepository;

    constructor(cryptor: Cryptor, authJWT: AuthJWT, authRepository: AuthRepository) {
        this.cryptor = cryptor;
        this.authJWT = authJWT;
        this.authRepository = authRepository;
    }

    public async verifyUser(authControllerDTOInput: AuthControllerDTOInput): Promise<AuthControllerDTOOutput> {
        const userDto: UserDTO = new UserDTO();

        const password: string = await this.cryptor.encrypt(authControllerDTOInput.getPassword());



        return new AuthControllerDTOOutput();
    }

    public async createUser(authControllerDTOInput: AuthControllerDTOInput): Promise<AuthControllerDTOOutput> {
        const email: string = authControllerDTOInput.getEmail();
        const accessLevel: number = authControllerDTOInput.getAccessLevel();

        const password: string = await this.cryptor.encrypt(authControllerDTOInput.getPassword());
        const tokenDto: UserTokenDto = new UserTokenDto();
        tokenDto.email = email;
        tokenDto.accessLevel = accessLevel

        const refreshToken: string = this.authJWT.createToken(
            Token.Refresh,
            tokenDto
        );
        const accessToken: string = this.authJWT.createToken(
            Token.Access,
            tokenDto
        );

        const userDto: UserDTO = new UserDTO().set(
            email,
            password,
            accessLevel,
            authControllerDTOInput.getDevice(),
            authControllerDTOInput.getIp(),
            authControllerDTOInput.getAuthorizeDate(),
            refreshToken,
            accessToken
        );

        this.authRepository.createUser(userDto);

        const authControllerDtoOutput: AuthControllerDTOOutput = new AuthControllerDTOOutput().set(
          refreshToken,
          accessToken
        );

        return authControllerDtoOutput;
    }

}