import { Request, Response, NextFunction } from "express";
import { ParseHelper } from "../utils/parse-helper";
import axios, { AxiosResponse } from "axios";

export async function checkAccessToken(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const authPort: string = ParseHelper.parseString(process.env.AUTH_API_PORT);
    const authHost: string = ParseHelper.parseString(process.env.AUTH_API_HOST)
    const authAPIPrefix: string = ParseHelper.parseString(process.env.AUTH_API_PREFIX);
    const authServiceUrl: string = "http://"+authHost+":"+authPort+authAPIPrefix;

    const response:AxiosResponse<any> = await axios.get(`${authServiceUrl}/verifyUserAndGet`);

    if (response.status === 200) {
      res.set(response.data);
      next();
    } else {
      throw new Error('Authentication error');
    }
  } catch (error) {
    console.error('Error checking auth status:', error);
    res.set({ isExpired: true, message: 'Error checking auth status' }) ;
    res.redirect('');
    next();
  }
}