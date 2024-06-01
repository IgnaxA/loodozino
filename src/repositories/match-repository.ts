import { IMatch } from "../contracts/match";

export interface MatchRepository {
  createMatch(match: IMatch) : Promise<void>;
  getMatch(match_ident: String) : Promise<IMatch>;
  editMatch(match: IMatch) : Promise<IMatch>;
  removeMatch(match_ident: String): Promise<IMatch>;
}