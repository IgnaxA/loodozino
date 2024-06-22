
export class UserDTO {
    private email: string;
    private password: string;
    private accessLevel: number;
    private device: string;
    private ip: string;
    private authorizeDate: string;
    private refreshToken: string;
    private accessToken: string;

    constructor() {
        this.email = "";
        this.password = "";
        this.accessLevel = -1;
        this.device = "";
        this.ip = "";
        this.authorizeDate = "";
        this.refreshToken = "";
        this.accessToken = "";
    }

    public set(email: string,
               password: string,
               accessLevel: number,
               device: string,
               ip: string,
               authorizeDate: string,
               refreshToken: string,
               accessToken: string): UserDTO {

        this.email = email;
        this.password = password;
        this.accessLevel = accessLevel;
        this.device = device;
        this.ip = ip;
        this.authorizeDate = authorizeDate;
        this.refreshToken = refreshToken;
        this.accessToken = accessToken;

        return this;
    }

    public setEmail(email: string): UserDTO {
        this.email = email;
        return this;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public setAccessLevel(accessLevel: number): void {
        this.accessLevel = accessLevel;
    }

    public setDevice(device: string): void {
        this.device = device;
    }

    public setIp(ip: string): void {
        this.ip = ip;
    }

    public setAuthorizeDate(authorizeDate: string): void {
        this.authorizeDate = authorizeDate;
    }

    public setRefreshToken(refreshToken: string): void {
        this.refreshToken = refreshToken;
    }

    public setAccessToken(accessToken: string): void {
        this.accessToken = accessToken;
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

    public getRefreshToken(): string {
        return this.refreshToken;
    }

    public getAccessToken(): string {
        return this.accessToken;
    }
}