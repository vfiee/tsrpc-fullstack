/*
 * @Author: vyron
 * @Date: 2022-04-27 17:24:43
 * @LastEditTime: 2022-04-27 17:34:39
 * @LastEditors: vyron
 * @Description: 获取用户信息
 * @FilePath: /tsrpc-app/backend/src/api/user/ApiGetUser.ts
 */

import { ApiCall } from 'tsrpc'
import { ReqGetUser, ResGetUser } from '../../shared/protocols/user/TplGetUser'

export async function ApiGetUser(call: ApiCall<ReqGetUser, ResGetUser>) {
  console.log(call.req)
}
