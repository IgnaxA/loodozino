import {DeviceQueries} from "../device-queries";
import {QueryConstructor} from "../../query-constructors/query-constructor";
import {SingleQueryConstructor} from "../../query-constructors/extendors/single-query-constructor";

export class DeviceQueriesPg implements DeviceQueries {
    private readonly selectDeviceByNameAndIp: string =
        "SELECT devices.device_id FROM devices WHERE devices.device_name = $1 AND devices.device_ip = $2";

    private readonly checkDeviceAndTokenLink: string =
        "SELECT sa.device_id, sa.token_id FROM device_link_tokens AS sa WHERE sa.device_id = $1 AND sa.token_id = $2";

    public checkDevice(name: string, ip: string): QueryConstructor {
        const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();
        const parameters: Array<any> = new Array<any>(name, ip);

        queryConstructor.setQuery(this.selectDeviceByNameAndIp);
        queryConstructor.setParameters(parameters);

        return queryConstructor;
    }

    public checkDeviceLinkToken(deviceId: number, tokenId: number): QueryConstructor {
        const queryConstructor: SingleQueryConstructor = new SingleQueryConstructor();
        const parameters: Array<any> = new Array<any>(deviceId, tokenId);

        queryConstructor.setQuery(this.checkDeviceAndTokenLink);
        queryConstructor.setParameters(parameters);

        return queryConstructor;
    }
}