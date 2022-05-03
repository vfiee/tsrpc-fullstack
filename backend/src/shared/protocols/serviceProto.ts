import { ServiceProto } from 'tsrpc-proto';
import { ReqCreateUser, ResCreateUser } from './user/PtlCreateUser';
import { ReqDeleteUser, ResDeleteUser } from './user/PtlDeleteUser';
import { ReqGetUser, ResGetUser } from './user/PtlGetUser';
import { ReqUpdateUser, ResUpdateUser } from './user/PtlUpdateUser';

export interface ServiceType {
    api: {
        "user/CreateUser": {
            req: ReqCreateUser,
            res: ResCreateUser
        },
        "user/DeleteUser": {
            req: ReqDeleteUser,
            res: ResDeleteUser
        },
        "user/GetUser": {
            req: ReqGetUser,
            res: ResGetUser
        },
        "user/UpdateUser": {
            req: ReqUpdateUser,
            res: ResUpdateUser
        }
    },
    msg: {

    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 5,
    "services": [
        {
            "id": 0,
            "name": "user/CreateUser",
            "type": "api",
            "conf": {
                "paramsValidateRule": {
                    "key": "phone",
                    "rules": [
                        {
                            "pattern": {},
                            "message": "请输入正确的手机号"
                        }
                    ]
                }
            }
        },
        {
            "id": 1,
            "name": "user/DeleteUser",
            "type": "api"
        },
        {
            "id": 2,
            "name": "user/GetUser",
            "type": "api"
        },
        {
            "id": 3,
            "name": "user/UpdateUser",
            "type": "api"
        }
    ],
    "types": {
        "user/PtlCreateUser/ReqCreateUser": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/io/request/index/BaseRequest"
                    }
                },
                {
                    "id": 1,
                    "type": {
                        "target": {
                            "type": "Reference",
                            "target": "base/mongo/user/index/DbUser"
                        },
                        "keys": [
                            "_id",
                            ""
                        ],
                        "type": "Omit"
                    }
                }
            ]
        },
        "base/io/request/index/BaseRequest": {
            "type": "Interface"
        },
        "base/mongo/user/index/DbUser": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "_id",
                    "type": {
                        "type": "Reference",
                        "target": "?mongodb/ObjectId"
                    }
                },
                {
                    "id": 1,
                    "name": "name",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "nickname",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 3,
                    "name": "avatar",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 4,
                    "name": "password",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 5,
                    "name": "phone",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 6,
                    "name": "email",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 7,
                    "name": "sex",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 8,
                    "name": "born",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                },
                {
                    "id": 9,
                    "name": "wechatId",
                    "type": {
                        "type": "Reference",
                        "target": "?mongodb/ObjectId"
                    },
                    "optional": true
                }
            ]
        },
        "user/PtlCreateUser/ResCreateUser": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/io/response/index/BaseResponse"
                    }
                },
                {
                    "id": 1,
                    "type": {
                        "type": "Reference",
                        "target": "base/mongo/user/index/DbUser"
                    }
                }
            ]
        },
        "base/io/response/index/BaseResponse": {
            "type": "Interface"
        },
        "user/PtlDeleteUser/ReqDeleteUser": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/io/request/index/BaseRequest"
                    }
                }
            ]
        },
        "user/PtlDeleteUser/ResDeleteUser": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/io/response/index/BaseResponse"
                    }
                }
            ]
        },
        "user/PtlGetUser/ReqGetUser": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/io/request/index/BaseRequest"
                    }
                }
            ]
        },
        "user/PtlGetUser/ResGetUser": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/io/response/index/BaseResponse"
                    }
                }
            ]
        },
        "user/PtlUpdateUser/ReqUpdateUser": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/io/request/index/BaseRequest"
                    }
                }
            ]
        },
        "user/PtlUpdateUser/ResUpdateUser": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/io/response/index/BaseResponse"
                    }
                }
            ]
        }
    }
};