/*
 * @Author: vyron
 * @Date: 2022-04-27 17:25:57
 * @LastEditTime: 2022-05-05 16:54:44
 * @LastEditors: vyron
 * @Description: 创建用户
 * @FilePath: /tsrpc-app/backend/src/api/user/ApiCreateUser.ts
 */

import { ApiCall } from 'tsrpc'
import { ObjectId } from 'mongodb'
import { MongoDb } from '../../services'
import { SuccessResponse } from '../../shared/protocols/base'
import {
  ReqCreateUser,
  ResCreateUser
} from '@Protocols/user/PtlCreateUser'

export async function ApiCreateUser(
  call: ApiCall<ReqCreateUser, ResCreateUser>
) {
  const { req: { phone } = {}, logger } = call
  const collection = MongoDb.collection('User')
  const result = await collection.findOne({ phone })
  logger.log(`result:`, result)
  if (result !== null) {
    return call.succ({
      ...SuccessResponse,
      data: result
    })
  }
  const userId = new ObjectId()
  await collection.insertOne({
    ...call.req,
    _id: userId
  })
  return call.succ({
    ...SuccessResponse,
    data: {
      ...call.req,
      _id: userId
    }
  })
}
