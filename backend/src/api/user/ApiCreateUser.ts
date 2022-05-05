/*
 * @Author: vyron
 * @Date: 2022-04-27 17:25:57
 * @LastEditTime: 2022-05-05 09:02:14
 * @LastEditors: vyron
 * @Description: 创建用户
 * @FilePath: /tsrpc-app/backend/src/api/user/ApiCreateUser.ts
 */

import { ApiCall } from 'tsrpc'
import { ObjectId } from 'mongodb'
import { MongoDb } from '../../services'
import { ReqCreateUser, ResCreateUser } from '../../shared/protocols/user/PtlCreateUser'

export async function ApiCreateUser(
  call: ApiCall<ReqCreateUser, ResCreateUser>
) {
  const { req: { phone } = {}, logger } = call
  const collection = MongoDb.collection('User')
  const result = await collection.findOne({ phone })
  logger.log(`result:`, result)
  if (result !== null) {
    return call.succ(result)
  }
  const userId = new ObjectId()
  const op = collection.insertOne({
    ...call.req,
    _id: userId
  })
  logger.log(`op:`, op)
  return call.succ({
    ...call.req,
    _id: userId
  })
}
