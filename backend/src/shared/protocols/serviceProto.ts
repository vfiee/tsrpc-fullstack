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
    "version": 9,
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
                            "pattern": "^1\\d{10}$",
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
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "data",
                    "type": {
                        "type": "Reference",
                        "target": "base/mongo/user/index/DbUser"
                    }
                }
            ]
        },
        "base/io/response/index/BaseResponse": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "code",
                    "type": {
                        "type": "Reference",
                        "target": "base/io/response/index/ResponseStatus"
                    }
                },
                {
                    "id": 1,
                    "name": "message",
                    "type": {
                        "type": "Reference",
                        "target": "base/io/response/index/ResponseMessage"
                    },
                    "optional": true
                },
                {
                    "id": 2,
                    "name": "data",
                    "type": {
                        "type": "Union",
                        "members": [
                            {
                                "id": 0,
                                "type": {
                                    "type": "Reference",
                                    "target": "base/io/response/index/ResponseData"
                                }
                            },
                            {
                                "id": 1,
                                "type": {
                                    "type": "Reference",
                                    "target": "base/io/response/index/ResponseList"
                                }
                            },
                            {
                                "id": 2,
                                "type": {
                                    "type": "Reference",
                                    "target": "base/io/response/index/EmptyResponseData"
                                }
                            }
                        ]
                    }
                }
            ],
            "indexSignature": {
                "keyType": "String",
                "type": {
                    "type": "Any"
                }
            }
        },
        "base/io/response/index/ResponseStatus": {
            "type": "Enum",
            "members": [
                {
                    "id": 0,
                    "value": 200
                },
                {
                    "id": 1,
                    "value": 500
                },
                {
                    "id": 2,
                    "value": 401
                },
                {
                    "id": 3,
                    "value": 404
                },
                {
                    "id": 4,
                    "value": 403
                }
            ]
        },
        "base/io/response/index/ResponseMessage": {
            "type": "Enum",
            "members": [
                {
                    "id": 0,
                    "value": "请求成功"
                },
                {
                    "id": 1,
                    "value": "请求失败,请稍后重试"
                },
                {
                    "id": 2,
                    "value": "请先登录"
                },
                {
                    "id": 3,
                    "value": "请求资源不存在"
                },
                {
                    "id": 4,
                    "value": "无权限访问"
                }
            ]
        },
        "base/io/response/index/ResponseData": {
            "type": "Interface"
        },
        "base/io/response/index/ResponseList": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "pageIndex",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 1,
                    "name": "pageSize",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 2,
                    "name": "total",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 3,
                    "name": "list",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Any"
                        }
                    }
                }
            ]
        },
        "base/io/response/index/EmptyResponseData": {
            "type": "Literal",
            "literal": null
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