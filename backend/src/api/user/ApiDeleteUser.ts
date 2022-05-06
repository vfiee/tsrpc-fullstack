/*
 * @Author: vyron
 * @Date: 2022-04-27 17:25:57
 * @LastEditTime: 2022-05-05 21:21:05
 * @LastEditors: vyron
 * @Description: 删除用户
 * @FilePath: /tsrpc-app/backend/src/api/user/ApiDeleteUser.ts
 */
import { ApiCall } from 'tsrpc'
import { ReqDeleteUser, ResDeleteUser } from '@Protocols/user/PtlDeleteUser'
import { MongoDb } from '@/services'
import { FailedResponse, SuccessResponse } from '@/shared/protocols/base'

export async function ApiDeleteUser(
  call: ApiCall<ReqDeleteUser, ResDeleteUser>
) {
  const { req: { id } = {} } = call
  const collection = MongoDb.collection('User')
  const { deletedCount } = await collection.deleteOne({ _id: id })
  return call.succ(
    deletedCount === 1
      ? {
          ...SuccessResponse,
          message: '删除成功'
        }
      : {
          ...FailedResponse,
          message: '删除失败'
        }
  )
}
