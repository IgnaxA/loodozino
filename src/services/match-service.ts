import { IMatch } from "../contracts/match";

export interface MatchService {
  createMatch(match: IMatch) : Promise<void>;
  getMatch(match_ident: string): Promise<IMatch>;
  editMatch(match: IMatch): Promise<IMatch>;
  removeMatch(match_ident: string): Promise<IMatch>;
}