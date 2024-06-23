import { Request, Response, NextFunction } from "express";
import { ParseHelper } from "../utils/parse-helper";
import axios, { AxiosResponse } from "axios";

export async function verifyUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const protocol: string = ParseHelper.parseString(process.env.AUTH_API_PROTOCOL);
    const authPort: string = ParseHelper.parseString(process.env.AUTH_API_PORT);
    const authHost: string = ParseHelper.parseString(process.env.AUTH_API_HOST)
    const authAPIPrefix: string = ParseHelper.parseString(process.env.AUTH_API_PREFIX);
    const authServiceUrl: string = protocol+authHost+":"+authPort+authAPIPrefix;

    const token: string| undefined= req.get("token");

    const response: AxiosResponse<any> = await axios.get(`${authServiceUrl}/verifyAndGet`,
      {
        headers: {
          Authorization: token
        }
      }
    );

    if (response.status === 200) {
      res.locals.authStatus = response.data;
      next();
    } else {
      res.locals.authStatus = {isTokenExpired: true, message: 'Authentication error'};
    }
  } catch (error) {
    console.error('Error checking auth status:', error);
    res.locals.authStatus = {isTokenExpired: true, message: 'Error checking auth status'};
    next();
  }
}