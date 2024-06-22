import {TableInfo} from "./table-info";

export class Table {
    public static User: TableInfo = new TableInfo('users', 'user_id');
    public static Device: TableInfo = new TableInfo('devices', 'device_id');
    public static Token: TableInfo = new TableInfo('tokens', 'token_id');
    public static UserLinkDevice: TableInfo = new TableInfo('user_link_devices', '');
    public static DeviceLinkToken: TableInfo = new TableInfo('device_link_tokens', '');
}