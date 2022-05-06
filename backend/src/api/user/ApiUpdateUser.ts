/*
 * @Author: vyron
 * @Date: 2022-04-27 17:25:57
 * @LastEditTime: 2022-05-05 21:45:18
 * @LastEditors: vyron
 * @Description: 更新用户信息
 * @FilePath: /tsrpc-app/backend/src/api/user/ApiUpdateUser.ts
 */

import { ApiCall } from 'tsrpc'
import { ReqUpdateUser, ResUpdateUser } from '@Protocols/user/PtlUpdateUser'
import { MongoDb } from '@/services'
import { isEmpty } from '@j-utils/type'
import { FailedResponse, SuccessResponse } from '@/shared/protocols/base'

export async function ApiUpdateUser(
  call: ApiCall<ReqUpdateUser, ResUpdateUser>
) {
  const { req = {} } = call
  if (isEmpty(req))
    return call.succ({
      ...FailedResponse,
      message: '请求参数为空'
    })
  const collection = MongoDb.collection('User')
  await collection
    .updateOne({ ...req }, { $set: req })
    .then(() => {
      return call.succ({
        ...SuccessResponse,
        message: '更新成功'
      })
    })
    .catch(() => {
      return call.succ({
        ...FailedResponse,
        message: '更新失败'
      })
    })
}
