/*
 * @Author: vyron
 * @Date: 2022-04-27 17:25:57
 * @LastEditTime: 2022-05-05 21:03:41
 * @LastEditors: vyron
 * @Description: 创建用户
 * @FilePath: /tsrpc-app/backend/src/api/user/ApiCreateUser.ts
 */

import { ApiCall } from 'tsrpc'
import { ObjectId } from 'mongodb'
import { MongoDb } from '../../services'
import { SuccessResponse } from '../../shared/protocols/base'
import { ReqCreateUser, ResCreateUser } from '@Protocols/user/PtlCreateUser'

export async function ApiCreateUser(
  call: ApiCall<ReqCreateUser, ResCreateUser>
) {
  const { req: { phone } = {}, logger } = call
  const collection = MongoDb.collection('User')
  const result = await collection.findOne({ phone })
  if (result !== null) {
    return call.succ({
      ...SuccessResponse,
      message: '用户已存在',
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
