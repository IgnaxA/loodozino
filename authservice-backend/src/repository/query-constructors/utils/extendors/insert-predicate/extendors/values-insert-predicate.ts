import {InsertPredicate} from "../insert-predicate";

export class ValuesInsertPredicate extends InsertPredicate {
    private readonly values: Array<any>;

    constructor(values: Array<any>) {
        super();
        this.values = values;
    }

    public interpret(): string {
        let builder: string = "VALUES (DEFAULT, ";
        let counter: number = 1;
        this.values.forEach(value => {
            builder += this.transform(value);

            if (counter != this.values.length) {
                builder += ", ";
            }

            counter += 1;
        });

        builder += ")";

        return builder;
    }

    private transform(value: any): string {
        if (typeof value === "string") {
            return `'${value}'`;
        }

        if (typeof value === "number") {
            return String(value);
        }

        // if (typeof value === "date") {
        //     return `'${value}'`;
        // }

        return "";
    }

}