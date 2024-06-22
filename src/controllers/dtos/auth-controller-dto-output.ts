
export class AuthControllerDTOOutput {
    private refreshToken: string = "";
    private accessToken: string = "";
    private accessLevel: number = -1;

    constructor() {

    }

    public set(refreshToken: string, accessToken: string, accessLevel: number): AuthControllerDTOOutput {
        this.refreshToken = refreshToken;
        this.accessToken = accessToken;
        this.accessLevel = accessLevel;

        return this;
    }

    public getRefreshToken(): string {
        return this.refreshToken;
    }

    public getAccessToken(): string {
        return this.accessToken;
    }

    public getAccessLevel(): number {
        return this.accessLevel;
    }
}