import {Table} from "../../with-query";


export abstract class InsertPredicate {
    protected constructor() {

    }

    public abstract interpret(): string;
}