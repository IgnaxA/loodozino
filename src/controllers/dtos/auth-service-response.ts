export interface AuthServiceResponse {
  "token": string;
  "isTokenExpired" : boolean;
  "login": string;
  "accessLevel": number;
}