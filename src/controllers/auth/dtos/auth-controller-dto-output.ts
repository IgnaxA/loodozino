
export class AuthControllerDTOOutput {
    private refreshToken: string = "";
    private accessToken: string = "";

    public setSignInOutput(refreshToken: string, accessToken: string): void {
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