
export class AuthControllerDTOInput {
    private email: string;
    private password: string;
    private accessLevel: number;
    private device: string;
    private ip: string;
    private authorizeDate: string;

    constructor() {
        this.email = "";
        this.password = "";
        this.accessLevel = -1;
        this.device = "";
        this.ip = "";
        this.authorizeDate = "";
    }

    public setInput(email: string, password: string, device: string, ip: string, authorizeDate: string): AuthControllerDTOInput {
        this.email = email;
        this.password = password;
        this.device = device;
        this.ip = ip;
        this.authorizeDate = authorizeDate;

        return this;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPassword(): string {
        return this.password;
    }

    public getAccessLevel(): number {
        return this.accessLevel;
    }

    public getDevice(): string {
        return this.device;
    }

    public getIp(): string {
        return this.ip;
    }

    public getAuthorizeDate(): string {
        return this.authorizeDate;
    }

    public setAccessLevel(accessLevel: number): void {
        this.accessLevel = accessLevel;
    }
}