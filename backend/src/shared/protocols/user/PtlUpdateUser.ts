/*
 * @Author: vyron
 * @Date: 2022-05-03 21:55:09
 * @LastEditTime: 2022-05-05 21:33:29
 * @LastEditors: vyron
 * @Description: 更新用户信息
 * @FilePath: /tsrpc-app/backend/src/shared/protocols/user/PtlUpdateUser.ts
 */
import { DbUser } from '../base'
import { BaseRequest } from '../base/io/request'
import { BaseResponse } from '../base/io/response'

type UpdateUserKeys = 'name' | 'nickname' | 'avatar' | 'email' | 'sex' | 'born'
export interface ReqUpdateUser
  extends BaseRequest,
    Partial<Pick<DbUser, UpdateUserKeys>> {}

export interface ResUpdateUser extends BaseResponse {}
