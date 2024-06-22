
export class TableInfo {
    private readonly table: string;
    private readonly id: string;

    constructor(table: string, id: string) {
        this.table = table;
        this.id = id;
    }

    public getTable(): string {
        return this.table;
    }

    public getId(): string {
        return this.id;
    }

    toString(): string {
        return this.table;
    }
}