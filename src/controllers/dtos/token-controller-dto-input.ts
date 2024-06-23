
export class TokenControllerDtoInput {
    private token: string;
    private device: string;
    private ip: string;

    constructor() {
        this.token = "";
        this.device = "";
        this.ip = ""
    }

    public set(token: string, device: string, ip: string): TokenControllerDtoInput {
        this.token = token;
        this.device = device;
        this.ip = ip;

        return this;
    }

    public setToken(token: string): void {
        this.token = token;
    }

    public getToken(): string {
        return this.token;
    }
}