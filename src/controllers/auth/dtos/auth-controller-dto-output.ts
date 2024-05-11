
export class AuthControllerDTOOutput {
    private refreshToken: String = "";
    private accessToken: String = "";

    public setSignInOutput(refreshToken: String, accessToken: String): void {
        this.refreshToken = refreshToken;
        this.accessToken = accessToken;
    }

    public getRefreshToken(): String {
        return this.refreshToken;
    }

    public getAccessToken(): String {
        return this.accessToken;
    }
}