import { Match } from "../entities/match";
import { Player } from "../entities/player";

export interface ProfileService {
    getGameHistoryByPlayer(player: Player): Promise<Array<Match>>
    getGameHistoryByBoard(player: Player): Promise<Array<Match>>
}