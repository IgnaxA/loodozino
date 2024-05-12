
export class AuthControllerDTOInput {
    private userEmail: string = "";
    private userPassword: string = "";

    constructor(userEmail: string, userPassword: string) {
        this.userEmail = userEmail;
        this.userPassword = userPassword;
    }

    public getUserEmail(): string {
        return this.userEmail;
    }

    public getUserPassword(): string {
        return this.userPassword;
    }
}