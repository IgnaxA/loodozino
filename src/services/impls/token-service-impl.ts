import {TokenService} from "../token-service";
import {TokenControllerDtoInput} from "../../controllers/dtos/token-controller-dto-input";
import {TokenControllerDtoOutput} from "../../controllers/dtos/token-controller-dto-output";
import {TokenRepository} from "../../repository/token-repository";
import {TokenJWT} from "../../crypto/json-web-token/token-jwt";
import {Assert} from "../../utils/assert";
import {ErrorHandler} from "../../utils/error-handler";
import {CheckTokenResponse} from "../../repository/impls/token-repository-pg";
import {DeviceRepository} from "../../repository/device-repository";
import {DeviceAndTokenLinkResponse, DeviceCheckResponse} from "../../repository/impls/device-repository-pg";
import {UserTokenDto} from "../dtos/user-token-dto";
import {Token} from "../../crypto/json-web-token/impls/auth-jwt-impl";

export class TokenServiceImpl implements TokenService {
    private readonly tokenJWT: TokenJWT;
    private readonly tokenRepository: TokenRepository;
    private readonly deviceRepository: DeviceRepository;

    constructor(tokenJWT: TokenJWT, tokenRepository: TokenRepository, deviceRepository: DeviceRepository) {
        this.tokenJWT = tokenJWT;
        this.tokenRepository = tokenRepository;
        this.deviceRepository = deviceRepository;
    }

    public async verifyAndGet(tokenControllerDtoInput: TokenControllerDtoInput): Promise<TokenControllerDtoOutput> {
        const token: string = tokenControllerDtoInput.getToken();

        const decoded: AccessTokenDecoded | null = this.tokenJWT.verifyToken<AccessTokenDecoded>(token);

        Assert.notNull(decoded, "Cannot decode token");

        const tokenDtoOutput: TokenControllerDtoOutput = new TokenControllerDtoOutput()
            .setEmail(decoded?.email)
            .setAccessLevel(decoded?.accessLevel)
            .setIsTokenExpired(false);

        return tokenDtoOutput;
    }

    public async getAccessToken(tokenControllerDtoInput: TokenControllerDtoInput): Promise<TokenControllerDtoOutput> {
        try {
            const token: string = tokenControllerDtoInput.getToken();

            const tokenValidResponse: CheckTokenResponse = await this.tokenRepository.checkToken(token);

            Assert.notNullOrUndefined(tokenValidResponse, "This token does not exists")

            if (!tokenValidResponse.token_status) {
                throw new Error("Token are not valid");
            }

            const decoded: AccessTokenDecoded | null = this.tokenJWT.verifyToken<AccessTokenDecoded>(token);


            const deviceCheckResponse: DeviceCheckResponse = await this.deviceRepository.checkDevice(
                tokenControllerDtoInput.getDevice(),
                tokenControllerDtoInput.getIp()
            );

            Assert.notNullOrUndefined(deviceCheckResponse, "This device does not exists");

            const deviceLinkToken: DeviceAndTokenLinkResponse = await this.deviceRepository.checkDeviceLinkToken(
                deviceCheckResponse.device_id,
                tokenValidResponse.token_id
            );

            Assert.notNullOrUndefined(deviceLinkToken, "This token are not linked with device");


            const email: string = decoded?.email ?? "";
            const accessLevel: number = decoded?.accessLevel ?? -1;
            const tokenDto: UserTokenDto = new UserTokenDto();
            tokenDto.email = email;
            tokenDto.accessLevel = accessLevel;

            const accessToken: string = this.tokenJWT.createToken(
                Token.Access,
                tokenDto
            );

            return new TokenControllerDtoOutput().setToken(accessToken);
        } catch (err: any) {
            ErrorHandler.throwError(err, "Something went wrong while getting access token");
        }

        return new TokenControllerDtoOutput();
    }
}

export interface AccessTokenDecoded {
    email: string;
    accessLevel: number;
}