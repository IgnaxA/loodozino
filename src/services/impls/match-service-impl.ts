import { MatchService } from "../match-service";
import { MatchRepository } from "../../repositories/match-repository";
import { IMatch } from "../../contracts/match";

export class MatchServiceImpl implements MatchService {
  private readonly matchRepository: MatchRepository;

  constructor (matchRepository: MatchRepository) {
    this.matchRepository = matchRepository;
  }

  public async createMatch(match: IMatch) : Promise<void> {
    await this.matchRepository.createMatch(match);
  }

  public async getMatch(match_ident: string): Promise<IMatch> {
    return await this.matchRepository.getMatch(match_ident);
  }

  public async editMatch(match: IMatch): Promise<IMatch> {
    return await this.matchRepository.editMatch(match);
  }

  public async removeMatch(match_ident: string): Promise<IMatch> {
    return await this.matchRepository.removeMatch(match_ident);
  }
}