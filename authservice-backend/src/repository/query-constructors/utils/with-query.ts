

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

export enum Table {
    User='users',
    Device='devices',
    Token='tokens',
    UserLinkDevice='user_link_devices',
    DeviceLinkToken='device_link_tokens'
}