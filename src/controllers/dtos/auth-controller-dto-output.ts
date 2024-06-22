
export class AuthControllerDTOOutput {
    private refreshToken: string = "";
    private accessToken: string = "";

    constructor() {

    }

    public set(refreshToken: string, accessToken: string): AuthControllerDTOOutput {
        this.refreshToken = refreshToken;
        this.accessToken = accessToken;

        return this;
    }

    public getRefreshToken(): string {
        return this.refreshToken;
    }

    public getAccessToken(): string {
        return this.accessToken;
    }
}