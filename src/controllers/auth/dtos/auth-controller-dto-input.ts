
export class AuthControllerDTOInput {
    private userEmail: String = "";
    private userPassword: String = "";

    public setSignInInput(userEmail: String, userPassword: String): void {
        this.userEmail = userEmail;
        this.userPassword = userPassword;
    }

    public getUserEmail(): String {
        return this.userEmail;
    }

    public getUserPassword(): String {
        return this.userPassword;
    }
}