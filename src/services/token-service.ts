import {TokenControllerDtoInput} from "../controllers/dtos/token-controller-dto-input";
import {TokenControllerDtoOutput} from "../controllers/dtos/token-controller-dto-output";


export interface TokenService {
    verifyAndGet(tokenControllerDtoInput: TokenControllerDtoInput): Promise<TokenControllerDtoOutput>;
    getAccessToken(tokenControllerDtoInput: TokenControllerDtoInput): Promise<TokenControllerDtoOutput>;
}