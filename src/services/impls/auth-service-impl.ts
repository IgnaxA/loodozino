import {AuthService} from "../auth-service";
import {AuthControllerDTOInput} from "../../controllers/dtos/auth-controller-dto-input";
import {AuthControllerDTOOutput} from "../../controllers/dtos/auth-controller-dto-output";
import {Cryptor} from "../../crypto/cryptor/cryptor";
import {AuthJWT} from "../../crypto/json-web-token/auth-jwt";
import {AuthRepository} from "../../repository/auth-repository";
import {Token} from "../../crypto/json-web-token/impls/auth-jwt-impl";
import {UserDTO} from "../dtos/user-dto";
import {UserTokenDto} from "../dtos/user-token-dto";
import {ErrorHandler} from "../../utils/error-handler";
import {VerifyResponse} from "../../repository/impls/auth-repository-pg";
import {Assert} from "../../utils/assert";

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
        try {
            const userDto: UserDTO = new UserDTO()
                .setEmail(authControllerDTOInput.getEmail());

            const response: VerifyResponse = await this.authRepository.checkUser(userDto);

            Assert.notNullOrUndefined(response, "User with that email does not exists")

            const result: boolean = await this.cryptor.compare(authControllerDTOInput.getPassword(), response.user_password);

            if (!result) {
                ErrorHandler.throwError(null, "User with that password does not exists or passwords mismatch");
            }

            const tokenDto: UserTokenDto = new UserTokenDto();
            tokenDto.email = authControllerDTOInput.getEmail();
            tokenDto.accessLevel = response.user_access_level;

            const refreshToken: string = this.authJWT.createToken(
                Token.Refresh,
                tokenDto
            );
            const accessToken: string = this.authJWT.createToken(
                Token.Access,
                tokenDto
            );

            const authControllerDtoOutput: AuthControllerDTOOutput = new AuthControllerDTOOutput().set(
                refreshToken,
                accessToken,
                response.user_access_level
            );

            return authControllerDtoOutput;
        } catch (err: any) {
            ErrorHandler.throwError(err, "Something went wrong while verifying user");
        }

        return new AuthControllerDTOOutput();
    }

    public async createUser(authControllerDTOInput: AuthControllerDTOInput): Promise<AuthControllerDTOOutput> {
        try {
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
                accessToken,
                accessLevel
            );

            return authControllerDtoOutput;
        } catch (err: any) {
            ErrorHandler.throwError(err, "Something went wrong while adding user");
        }

        return new AuthControllerDTOOutput();
    }

}