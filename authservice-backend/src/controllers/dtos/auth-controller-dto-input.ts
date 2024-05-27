
export class AuthControllerDTOInput {
    private userEmail: string = "";
    private userPassword: string = "";
    private userDevice: string = "";
    private userIp: string = "";

    constructor() {
    }

    public setInput(userEmail: string, userPassword: string, userDevice: string, userIp: string): AuthControllerDTOInput {
        this.userEmail = userEmail;
        this.userPassword = userPassword;
        this.userDevice = userDevice;
        this.userIp = userIp;

        return this;
    }

    public getUserEmail(): string {
        return this.userEmail;
    }

    public getUserPassword(): string {
        return this.userPassword;
    }

    public getUserDevice(): string {
        return this.userDevice;
    }

    public getUserIp(): string {
        return this.userIp;
    }
}