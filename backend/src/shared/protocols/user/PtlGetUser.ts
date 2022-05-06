/*
 * @Author: vyron
 * @Date: 2022-05-04 23:22:21
 * @LastEditTime: 2022-05-05 21:27:25
 * @LastEditors: vyron
 * @Description: 根据姓名,id,手机号查询单个用户
 * @FilePath: /tsrpc-app/backend/src/shared/protocols/user/PtlGetUser.ts
 */
import { ObjectId } from 'mongodb'
import { DbUser } from '../base'
import { BaseRequest } from '../base/io/request'
import { BaseResponse } from '../base/io/response'

export interface ReqGetUser extends BaseRequest {
  id?: ObjectId
  name?: string
  phone?: string
}

export interface ResGetUser extends BaseResponse<DbUser | null> {}
