
export class AuthControllerDTOInput {
    private userEmail: string = "";
    private userPassword: string = "";

    public setSignInInput(userEmail: string, userPassword: string): void {
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