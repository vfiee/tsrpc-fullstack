/*
 * @Author: vyron
 * @Date: 2022-04-27 17:24:43
 * @LastEditTime: 2022-05-05 21:29:44
 * @LastEditors: vyron
 * @Description: 获取用户信息
 * @FilePath: /tsrpc-app/backend/src/api/user/ApiGetUser.ts
 */

import { ApiCall } from 'tsrpc'
import { ReqGetUser, ResGetUser } from '@Protocols/user/PtlGetUser'
import { MongoDb } from '@/services'
import {
  DbUser,
  FailedResponse,
  SuccessResponse
} from '@/shared/protocols/base'

export async function ApiGetUser(call: ApiCall<ReqGetUser, ResGetUser>) {
  const {
    req: { id, name, phone }
  } = call
  const collection = MongoDb.collection('User')
  let user: DbUser | null = null
  if (id) {
    user = await collection.findOne({ _id: id })
  } else if (name) {
    user = await collection.findOne({ name })
  } else if (phone) {
    user = await collection.findOne({ phone })
  }
  return call.succ(
    user === null
      ? {
          ...FailedResponse,
          message: '用户不存在'
        }
      : {
          ...SuccessResponse,
          message: '获取用户信息成功'
        }
  )
}
