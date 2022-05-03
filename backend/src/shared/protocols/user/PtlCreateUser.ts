import { BaseRequest } from '../base/io/request'
import { BaseResponse } from '../base/io/response'
import { BaseConf } from '../base/io/conf'
import { DbUser } from '../base/mongo/user'

export interface ReqCreateUser extends BaseRequest, Omit<DbUser, '_id' | ''> {}

export interface ResCreateUser extends BaseResponse, DbUser {}

export const conf: BaseConf = {
  paramsValidateRule: {
    key: 'phone',
    rules: [
      {
        pattern: /^1\d{10}$/,
        message: '请输入正确的手机号'
      }
    ]
  }
}
