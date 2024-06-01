import { IMatch } from "../../contracts/match";
import { MatchRepository } from "../match-repository";
import { MatchModel } from "../../models/match-model";
import { SettingsModel } from "../../models/settings-model";
import { Assert } from "../../utils/assert";
import { ISettings } from "../../contracts/settings";

export class MatchRepositoryImpl implements MatchRepository {
  constructor () {};
  public async createMatch(match: IMatch) : Promise<void> {
    const matchModel = new MatchModel(match);

    await matchModel.save();
  }

  public async getMatch(match_ident: String) : Promise<IMatch> {
    const match = await MatchModel.findOne(match_ident);

    Assert.notNullOrUndefined(match, "This match does not exist");

    const matchInterface: IMatch = new MatchModel(match);
    return matchInterface;
  }

  public async editMatch(match: IMatch) : Promise<IMatch> {
    const filter = { match_ident: match.match_ident};
    const update = {
      board_ident:match.board_ident,
      user_count: match.user_count,
      users:match.users,
      actions:match.actions,
      match_results:match.match_results
    };

    const newMatch = await MatchModel.findOneAndUpdate(filter, update, {new: true});

    Assert.notNullOrUndefined(newMatch, "This match does not exist");

    const matchInterface: IMatch = new MatchModel(newMatch);
    return matchInterface;
  }

  public async removeMatch(match_ident: String): Promise<IMatch> {
    const match = await MatchModel.findOneAndDelete(match_ident);

    Assert.notNullOrUndefined(match, "This match does not exist");

    const matchInterface: IMatch = new MatchModel(match);
    return matchInterface;
  }
}