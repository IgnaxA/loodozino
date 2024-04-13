import {StartUp} from "../start-up";

export class StartUpParse {
    private static startUp: StartUp;

    public static getStartUpConfig(): StartUp {
        this.startUp.PORT = process.env.PORT ? Number(process.env.PORT) : 8080;
        return this.startUp;
    }
}