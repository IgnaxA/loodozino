
export interface TokenJWT {
    verifyToken<T>(token: string): T | null;
}