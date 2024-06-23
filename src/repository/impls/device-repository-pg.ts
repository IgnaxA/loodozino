import {DeviceRepository} from "../device-repository";
import {DeviceQueries} from "../queries/device-queries";
import {QueryConstructor} from "../query-constructors/query-constructor";
import {TransactionRunner} from "../transaction-runners/transaction-runner";

export class DeviceRepositoryPg implements DeviceRepository {
    private readonly transactionRunner: TransactionRunner<QueryConstructor>;
    private readonly deviceQueries: DeviceQueries;

    constructor(transactionRunner: TransactionRunner<QueryConstructor>, deviceQueries: DeviceQueries) {
        this.transactionRunner = transactionRunner;
        this.deviceQueries = deviceQueries;
    }


    public async checkDevice(name: string, ip: string): Promise<DeviceCheckResponse> {
        const queryConstructor: QueryConstructor = this.deviceQueries.checkDevice(name, ip);

        const response: DeviceCheckResponse = await this.transactionRunner.runSingle<DeviceCheckResponse>(queryConstructor);

        return response;
    }

    public async checkDeviceLinkToken(device_id: number, token_id: number): Promise<DeviceAndTokenLinkResponse> {
        const queryConstructor: QueryConstructor = this.deviceQueries.checkDeviceLinkToken(device_id, token_id);

        const response: DeviceAndTokenLinkResponse =
            await this.transactionRunner.runSingle<DeviceAndTokenLinkResponse>(queryConstructor);

        return response;
    }

}

export interface DeviceCheckResponse {
    device_id: number;
}

export interface DeviceAndTokenLinkResponse {
    device_id: number;
    token_id: number;
}