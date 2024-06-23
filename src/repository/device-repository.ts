import {DeviceAndTokenLinkResponse, DeviceCheckResponse} from "./impls/device-repository-pg";

export interface DeviceRepository {
    checkDevice(name: string, ip: string): Promise<DeviceCheckResponse>;
    checkDeviceLinkToken(device_id: number, token_id: number): Promise<DeviceAndTokenLinkResponse>
}