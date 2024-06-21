import {InsertPredicate} from "../insert-predicate";
import {Table} from "../../../with-query";
import {WithQueryConstructor} from "../../../../extendors/with-query-constructor";

export class LinkedInsertPredicate extends InsertPredicate {
    private readonly links: Array<Table>;
    private readonly query: string = "SELECT * FROM ";
    private readonly CROSS_JOIN: string = "CROSS JOIN ";

    constructor(...links: Array<Table>) {
        super();
        this.links = links;
    }

    public interpret(): string {
        let builder: string = this.query;
        let counter: number = 1;

        this.links.forEach(table => {
            builder += table + WithQueryConstructor.POSTFIX;

            if (counter != this.links.length) {
                builder += this.CROSS_JOIN;
            }

            counter += 1;
        });

        return builder;
    }
}