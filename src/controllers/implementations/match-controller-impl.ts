import { Request, Response } from "express";
import { MatchController } from "../match-controller";
import { MatchService } from "../../services/match-service";
import { ErrorHandler } from "../../utils/error-handler";
import { IMatch } from "../../contracts/match";

export class MatchControllerImpl implements MatchController {
  private readonly matchService: MatchService;

  constructor(matchService: MatchService) {
    this.matchService = matchService;
  };

  public getMatch = async(req: Request, res: Response): Promise<void> => {
    try {
      const match_ident: string = req.body;
      const match = await this.matchService.getMatch(match_ident);
      this.setMatchAPIResponse(res, match);

    } catch (err: any) {
      ErrorHandler.setError(res, err);
    }
  }

  public createMatch = async(req: Request, res: Response): Promise<void> => {
    try {
      const match: IMatch = req.body;
      await this.matchService.createMatch(match);
      this.setMatchAPIResponse(res, match);

    } catch (err: any) {
      ErrorHandler.setError(res, err);
    }
  }

  public editMatch = async(req: Request, res: Response): Promise<void> => {
    try {
      const match: IMatch = req.body;
      const new_match = await this.matchService.editMatch(match);
      this.setMatchAPIResponse(res, new_match);

    } catch (err: any) {
      ErrorHandler.setError(res, err);
    }
  }

  public removeMatch = async(req: Request, res: Response): Promise<void> => {
    try {
      const match_ident: string = req.body;
      const match = await this.matchService.removeMatch(match_ident);
      this.setMatchAPIResponse(res, match);

    } catch (err: any) {
      ErrorHandler.setError(res, err);
    }
  }

  private setMatchAPIResponse(res: Response, responseData: IMatch): void {
    res
      .status(200)
      .json(responseData);
  }
}