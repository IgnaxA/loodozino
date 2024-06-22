import {Table, WithQuery} from "../with-query";
import {InsertPredicate} from "./insert-predicate/insert-predicate";
import {WithQueryConstructor} from "../../extendors/with-query-constructor";


export class Insert extends WithQuery {
    private readonly INSERT_INTO: string = "INSERT INTO";
    private readonly insertPredicate: InsertPredicate;
    private readonly RETURNING: string = "RETURNING";

    constructor(table: Table, insertPredicate: InsertPredicate) {
        super(table);
        this.insertPredicate = insertPredicate;
    }

    public interpret(): string {
        let builder: string =
            this.table
            + WithQueryConstructor.POSTFIX
            + " AS ("
            + this.INSERT_INTO
            + " "
            + this.getTable()
            + " "
            + this.insertPredicate.interpret();

        return builder;
    }
}