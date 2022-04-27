import { ServiceProto } from 'tsrpc-proto';


export interface ServiceType {
    api: {

    },
    msg: {

    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 1,
    "services": [],
    "types": {}
};