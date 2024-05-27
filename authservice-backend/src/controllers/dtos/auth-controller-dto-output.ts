
export class AuthControllerDTOOutput {
    private refreshToken: string = "";
    private accessToken: string = "";

    constructor(refreshToken: string, accessToken: string) {
        this.refreshToken = refreshToken;
        this.accessToken = accessToken;
    }

    public getRefreshToken(): string {
        return this.refreshToken;
    }

    public getAccessToken(): string {
        return this.accessToken;
    }
}