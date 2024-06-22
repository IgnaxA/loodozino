import {InsertPredicate} from "./insert-predicate/insert-predicate";
import {WithQueryConstructor} from "../../extendors/with-query-constructor";
import {WithQuery} from "../with-query";
import {Table} from "../table";

export class Insert extends WithQuery {
    private readonly insertPredicate: InsertPredicate;
    private readonly id: string;
    private readonly INSERT_INTO: string = "INSERT INTO";
    private readonly RETURNING: string = "RETURNING";

    constructor(table: Table, id: string, insertPredicate: InsertPredicate) {
        super(table);
        this.insertPredicate = insertPredicate;
        this.id = id;
    }

    public interpret(): string {
        let builder: string =
            this.table
            + WithQueryConstructor.POSTFIX
            + " AS ("
            + this.INSERT_INTO
            + " "
            + this.table
            + " "
            + this.insertPredicate.interpret()
            + " "
            + this.RETURNING
            + " ";

        builder += this.id !== ''
            ? this.id
            : "*";

        builder += ")";

        return builder;
    }
}