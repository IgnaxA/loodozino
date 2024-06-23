import {TokenService} from "../token-service";
import {TokenControllerDtoInput} from "../../controllers/dtos/token-controller-dto-input";
import {TokenControllerDtoOutput} from "../../controllers/dtos/token-controller-dto-output";
import {TokenRepository} from "../../repository/token-repository";
import {TokenJWT} from "../../crypto/json-web-token/token-jwt";
import {Assert} from "../../utils/assert";

export class TokenServiceImpl implements TokenService {
    private readonly tokenJWT: TokenJWT;
    private readonly tokenRepository: TokenRepository;

    constructor(tokenJWT: TokenJWT, tokenRepository: TokenRepository) {
        this.tokenJWT = tokenJWT;
        this.tokenRepository = tokenRepository;
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
        const token: string = tokenControllerDtoInput.getToken();



        return new TokenControllerDtoOutput();
    }
}

export interface AccessTokenDecoded {
    email: string;
    accessLevel: number;
}