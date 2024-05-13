import { Player } from "../entities/player";

export interface PlayerRepository {
    createPlayer(player: Player): Promise<Player>;
    getPlayerByLogin(login: string): Promise<Player>;
    editPlayerHistoryVisibility(login: string, history_visibility: boolean): Promise<Player>;
    removePlayerByLogin(login: string): Promise<Player>;
}