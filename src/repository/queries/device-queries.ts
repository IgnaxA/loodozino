import {QueryConstructor} from "../query-constructors/query-constructor";

export interface DeviceQueries {
    checkDevice(name: string, ip: string): QueryConstructor;
    checkDeviceLinkToken(deviceId: number, tokenId: number): QueryConstructor
}