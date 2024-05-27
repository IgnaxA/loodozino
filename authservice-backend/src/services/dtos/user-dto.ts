
export class UserDTO {
    private email: string;
    private password: string;
    private accessLevel: number;

    constructor() {
        this.email = "";
        this.password = "";
        this.accessLevel = -1;
    }

    public setUserDto(email: string, password: string, accessLevel: number): UserDTO {
        this.email = email;
        this.password = password;
        this.accessLevel = accessLevel;

        return this;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public setAccessLevel(accessLevel: number): void {
        this.accessLevel = accessLevel;
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
}