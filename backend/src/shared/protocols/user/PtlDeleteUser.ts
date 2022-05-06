/*
 * @Author: vyron
 * @Date: 2022-05-03 21:55:09
 * @LastEditTime: 2022-05-05 21:20:59
 * @LastEditors: vyron
 * @Description: 根据 ID 删除用户
 * @FilePath: /tsrpc-app/backend/src/shared/protocols/user/PtlDeleteUser.ts
 */
import { ObjectId } from 'mongodb'
import { BaseRequest } from '../base/io/request'
import { BaseResponse } from '../base/io/response'

export interface ReqDeleteUser extends BaseRequest {
  id: ObjectId
}

export interface ResDeleteUser extends BaseResponse {}
