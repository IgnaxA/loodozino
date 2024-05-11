import {AuthController} from "../auth-controller";
import {Request, Response} from "express";
import {AuthControllerDTOInput} from "../dtos/auth-controller-dto-input";
import {AuthService} from "../../../services/auth-service";
import {AuthControllerDTOOutput} from "../dtos/auth-controller-dto-output";
import {TokenExpiryParse, TokensExpiry} from "../../../configs/token-expiry-parse";
import {ErrorHandler} from "../../../handlers/error-handler";

export class AuthControllerImpl implements AuthController {
    private readonly authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    public async signIn(req: Request, res: Response): Promise<void> {
        try {
            const requestData: AuthControllerDTOInput = await this.getInputDTO(req);

            const responseData: AuthControllerDTOOutput = await this.authService
                .verifyUser(requestData);

            this.setAPIResponse(res, responseData);
        } catch (err: any) {
            ErrorHandler.setError(res, err);
        }
    }

    public async signUp(req: Request, res: Response): Promise<void> {
        try {
            const requestData: AuthControllerDTOInput = await this.getInputDTO(req);

            const responseData: AuthControllerDTOOutput = await this.authService
                .createUser(requestData);

            this.setAPIResponse(res, responseData);
        } catch (err: any) {
            ErrorHandler.setError(res, err);
        }
    }

    private async getInputDTO(req: Request): Promise<AuthControllerDTOInput> {
        const requestBody: AuthApiInput = req.body;
        const requestData: AuthControllerDTOInput = new AuthControllerDTOInput();

        requestData.setSignInInput(requestBody.userEmail, requestBody.userPassword);

        return requestData;
    }

    private setAPIResponse(res: Response, responseData: AuthControllerDTOOutput): void {
        const tokensExpiry: TokensExpiry = TokenExpiryParse.getTokensExpiry();

        res
            .status(200)
            .cookie('refresh_token', responseData.getRefreshToken(), {
                httpOnly: true,
                secure: true,
                maxAge: 1000 * tokensExpiry.refreshTokenExpiry
            })
            .cookie('access_token', responseData.getAccessToken(), {
                httpOnly: true,
                secure: true,
                maxAge: 1000 * tokensExpiry.accessTokenExpiry
            });
    }
}

interface AuthApiInput {
    userEmail: String;
    userPassword: String;
}