/*
 * @Author: vyron
 * @Date: 2022-04-27 17:24:43
 * @LastEditTime: 2022-05-03 21:20:27
 * @LastEditors: vyron
 * @Description: 获取用户信息
 * @FilePath: /tsrpc-app/backend/src/api/user/ApiGetUser.ts
 */

import { ApiCall } from 'tsrpc'
import { ReqGetUser, ResGetUser } from '@Protocols/user/PtlGetUser'

export async function ApiGetUser(call: ApiCall<ReqGetUser, ResGetUser>) {
  console.log(call.req)
}
