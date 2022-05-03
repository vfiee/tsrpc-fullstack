/*
 * @Author: vyron
 * @Date: 2022-04-27 17:25:57
 * @LastEditTime: 2022-05-03 21:20:17
 * @LastEditors: vyron
 * @Description: 删除用户
 * @FilePath: /tsrpc-app/backend/src/api/user/ApiDeleteUser.ts
 */
import { ApiCall } from 'tsrpc'
import { ReqDeleteUser, ResDeleteUser } from '@Protocols/user/PtlDeleteUser'

export async function ApiDeleteUser(
  call: ApiCall<ReqDeleteUser, ResDeleteUser>
) {
  console.log(call.req)
}
