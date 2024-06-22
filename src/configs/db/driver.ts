import {Pool} from "pg";

export interface Driver {
    // later can be added oracle driver and others in typification
    getDriver(): Pool;
}