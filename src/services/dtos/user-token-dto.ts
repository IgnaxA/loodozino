

export class UserTokenDto {
    public email: string = "";
    public accessLevel: number = -1;

    toString(): string {
        return `email: ${this.email}, accessLevel: ${this.accessLevel}`;
    }
}