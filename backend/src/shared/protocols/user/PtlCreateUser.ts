/*
 * @Author: vyron
 * @Date: 2022-05-05 17:34:19
 * @LastEditTime: 2022-05-05 21:02:51
 * @LastEditors: vyron
 * @Description: 创建新用户
 * @FilePath: /tsrpc-app/backend/src/shared/protocols/user/PtlCreateUser.ts
 */
import { BaseRequest } from '../base/io/request'
import { BaseResponse } from '../base/io/response'
import { BaseConf } from '../base/io/conf'
import { DbUser } from '../base/mongo/user'

export interface ReqCreateUser extends BaseRequest, Omit<DbUser, '_id'> {}

export interface ResCreateUser extends BaseResponse<DbUser> {}

export const conf: BaseConf = {
  paramsValidateRule: {
    key: 'phone',
    rules: [
      {
        pattern: '^1\\d{10}$',
        message: '请输入正确的手机号'
      }
    ]
  }
}
