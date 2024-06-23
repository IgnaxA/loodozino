

export class TokenControllerDtoOutput {
    private token: string;
    private email: string | undefined;
    private accessLevel: number | undefined;
    private isTokenExpired: boolean;

    constructor() {
        this.email = "";
        this.isTokenExpired = true;
        this.token = "";
        this.accessLevel = -1;
    }

    public setToken(token: string): TokenControllerDtoOutput {
        this.token = token;

        return this;
    }

    public setEmail(email: string | undefined): TokenControllerDtoOutput {
        this.email = email;

        return this;
    }

    public setAccessLevel(accessLevel: number | undefined): TokenControllerDtoOutput {
        this.accessLevel = accessLevel;

        return this;
    }

    public setIsTokenExpired(isTokenExpired: boolean): TokenControllerDtoOutput {
        this.isTokenExpired = isTokenExpired;

        return this;
    }

    public getToken(): string {
        return this.token;
    }

    public getEmail(): string | undefined {
        return this.email;
    }

    public getAccessLevel(): number | undefined {
        return this.accessLevel;
    }

    public getIsTokenExpired(): boolean {
        return this.isTokenExpired;
    }
}