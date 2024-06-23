import {Table} from "./table";


export abstract class WithQuery {

    protected readonly table: Table;

    protected constructor(table: Table) {
        this.table = table;
    }

    public getTable(): Table {
        return this.table;
    }

    public abstract interpret(): string;
}