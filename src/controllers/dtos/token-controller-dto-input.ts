
export class TokenControllerDtoInput {
    private token: string;

    constructor() {
        this.token = "";
    }

    public set(token: string): TokenControllerDtoInput {
        this.token = token;

        return this;
    }

    public setToken(token: string): void {
        this.token = token;
    }

    public getToken(): string {
        return this.token;
    }
}