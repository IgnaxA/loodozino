import { Request, Response } from "express";
import {TokenService} from "../../services/token-service";
import {TokenController} from "../token-controller";
import {ErrorHandler} from "../../utils/error-handler";
import {TokenControllerDtoInput} from "../dtos/token-controller-dto-input";
import {TokenControllerDtoOutput} from "../dtos/token-controller-dto-output";

export class TokenControllerImpl implements TokenController {
    private readonly tokenService: TokenService;

    constructor(tokenService: TokenService) {
        this.tokenService = tokenService;
    }

    public verifyAndGet = async (req: Request, res: Response): Promise<void> => {
        try {
            const tokenDtoInput: TokenControllerDtoInput = this.getInputDTO(req);

            const tokenDtoOutput: TokenControllerDtoOutput = await this.tokenService.verifyAndGet(tokenDtoInput);

            res
                .status(200)
                .json({
                    "login": tokenDtoOutput.getEmail(),
                    "accessLevel": tokenDtoOutput.getAccessLevel(),
                    "isTokenExpired": tokenDtoOutput.getIsTokenExpired()
                });

        } catch (err: any) {
            ErrorHandler.setError(res, err);
        }
    }

    public async getAccessToken(req: Request, res: Response): Promise<void> {
        try {
            const tokenDtoInput: TokenControllerDtoInput = this.getInputDTO(req);

            const tokenDtoOutput: TokenControllerDtoOutput = await this.tokenService.verifyAndGet(tokenDtoInput);

            res
                .status(500)
                .json({
                    "token": tokenDtoOutput.getToken()
                });
        } catch (err: any) {
            ErrorHandler.setError(res, err);
        }
    }

    private getInputDTO(req: Request): TokenControllerDtoInput {
        try {
            const requestBody: TokenApiInput = req.body;
            const requestData: TokenControllerDtoInput = new TokenControllerDtoInput()
                .set(requestBody.token);

            return requestData;
        } catch (err: any) {
            ErrorHandler.throwError(err, "Error occurred while parsing request body");
        }
        return new TokenControllerDtoInput();
    }

}

interface TokenApiInput {
    token: string;
}