import { Player } from "../../entities/player";
import { PlayerRepository } from "../player-repository";

export class PlayerRepositoryImpl implements PlayerRepository {
    
    public createPlayer = async (player: Player): Promise<Player> => {
        return new Player();
    }

    public removePlayerByLogin = async (login: string): Promise<Player> => {
        return new Player();
    }

    public editPlayerHistoryVisibility = async(login: string, history_visibility: boolean): Promise<Player> => {
        return new Player();
    }

    public getPlayerByLogin = async(login: string): Promise<Player> => {
        return new Player();
    }
}