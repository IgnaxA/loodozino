import {QueryConstructor} from "../query-constructor";
import {WithQuery} from "../utils/with-query";


export class WithQueryConstructor extends QueryConstructor {
    public static POSTFIX: string = "_SA";
    private withs: Array<WithQuery>;

    constructor() {
        super();
        this.withs = new Array<WithQuery>();
    }

    public setWiths(withs: Array<WithQuery>): void {
        this.withs = withs;
    }

    public addWith(withs: WithQuery): void {
        this.withs.push(withs) ;
    }

    public getWiths(): Array<WithQuery> {
        return this.withs;
    }

    public interpret(): void {
        let builder: string = "WITH ";
        let counter: number = 1;

        this.withs.forEach(query => {
           builder += query.interpret();

           if (counter != this.withs.length) {
               builder += ", ";
           }

           counter += 1;
        });

        builder +=
            " "
            + "SELECT * FROM"
            + " "
            + this.withs[this.withs.length - 1].getTable()
            + WithQueryConstructor.POSTFIX
            + ";";

        this.query = builder;
    }
}