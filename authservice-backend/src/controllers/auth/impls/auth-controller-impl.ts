import {AuthController} from "../auth-controller";
import {Request, Response} from "express";
import {AuthControllerDTOInput} from "../dtos/auth-controller-dto-input";
import {AuthService} from "../../../services/auth/auth-service";
import {AuthControllerDTOOutput} from "../dtos/auth-controller-dto-output";
import {TokenExpiryParse, TokenExpiryConfig} from "../../../configs/token-expiry-parse";
import {ErrorHandler} from "../../../handlers/error-handler";

export class AuthControllerImpl implements AuthController {
    private readonly authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    public async signIn(req: Request, res: Response): Promise<void> {
        try {
            const requestData: AuthControllerDTOInput = this.getInputDTO(req);

            const responseData: AuthControllerDTOOutput = await this.authService
                .verifyUser(requestData);

            this.setAPIResponse(res, responseData);
        } catch (err: any) {
            ErrorHandler.setError(res, err);
        }
    }

    public async signUp(req: Request, res: Response): Promise<void> {
        try {
            const requestData: AuthControllerDTOInput = this.getInputDTO(req);

            const responseData: AuthControllerDTOOutput = await this.authService
                .createUser(requestData);

            this.setAPIResponse(res, responseData);
        } catch (err: any) {
            ErrorHandler.setError(res, err);
        }
    }

    private getInputDTO(req: Request): AuthControllerDTOInput {
        const requestBody: AuthApiInput = req.body;
        const requestData: AuthControllerDTOInput = new AuthControllerDTOInput(requestBody.userEmail,
                                                                               requestBody.userPassword);

        return requestData;
    }

    private setAPIResponse(res: Response, responseData: AuthControllerDTOOutput): void {
        const tokenExpiryConfig: TokenExpiryConfig = TokenExpiryParse.getTokensExpiryConfig();

        res
            .status(200)
            .cookie('refresh_token', responseData.getRefreshToken(), {
                httpOnly: true,
                secure: true,
                maxAge: 1000 * tokenExpiryConfig.REFRESH_TOKEN_EXPIRY
            })
            .cookie('access_token', responseData.getAccessToken(), {
                httpOnly: true,
                secure: true,
                maxAge: 1000 * tokenExpiryConfig.ACCESS_TOKEN_EXPIRY
            });
    }
}

interface AuthApiInput {
    userEmail: string;
    userPassword: string;
}