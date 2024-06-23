import {AuthController} from "../auth-controller";
import {Request, Response} from "express";
import {AuthControllerDTOInput} from "../dtos/auth-controller-dto-input";
import {AuthService} from "../../services/auth-service";
import {AuthControllerDTOOutput} from "../dtos/auth-controller-dto-output";
import {TokenExpiryParse, TokenExpiryConfig} from "../../configs/utils/token-expiry-parse";
import {ErrorHandler} from "../../utils/error-handler";

export class AuthControllerImpl implements AuthController {
    private readonly authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    public signIn = async (req: Request, res: Response): Promise<void> => {
        try {
            const requestData: AuthControllerDTOInput = this.getInputDTO(req);

            const responseData: AuthControllerDTOOutput = await this.authService
                .verifyUser(requestData);

            this.setAPIResponse(res, responseData);
        } catch (err: any) {
            ErrorHandler.setError(res, err);
        }
    }

    public signUp = async (req: Request, res: Response): Promise<void> => {
        try {
            const requestData: AuthControllerDTOInput = this.getInputDTO(req);
            requestData.setAccessLevel(2);

            const responseData: AuthControllerDTOOutput = await this.authService
                .createUser(requestData);

            this.setAPIResponse(res, responseData);
        } catch (err: any) {
            ErrorHandler.setError(res, err);
        }
    }

    private getInputDTO(req: Request): AuthControllerDTOInput {
        try {
            const requestBody: AuthApiInput = req.body;
            const requestData: AuthControllerDTOInput = new AuthControllerDTOInput()
                .set(requestBody.email,
                          requestBody.password,
                          requestBody.device,
                          requestBody.ip,
                          requestBody.authorizeDate);

            return requestData;
        } catch (err: any) {
            ErrorHandler.throwError(err, "Error occurred while parsing request body");
        }
        return new AuthControllerDTOInput();
    }

    private setAPIResponse(res: Response, responseData: AuthControllerDTOOutput): void {
        const tokenExpiryConfig: TokenExpiryConfig = TokenExpiryParse.getTokensExpiryConfig();

        res
            .status(200)
            .json({
                'refresh_token': responseData.getRefreshToken(),
                'access_token': responseData.getAccessToken(),
                'access_level': responseData.getAccessLevel()
            });
    }
}

interface AuthApiInput {
    email: string;
    password: string;
    device: string;
    ip: string;
    authorizeDate: string;
}