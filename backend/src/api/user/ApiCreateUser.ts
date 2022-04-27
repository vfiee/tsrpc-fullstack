/*
 * @Author: vyron
 * @Date: 2022-04-27 17:25:57
 * @LastEditTime: 2022-04-27 17:31:40
 * @LastEditors: vyron
 * @Description: 创建用户
 * @FilePath: /tsrpc-app/backend/src/api/user/ApiCreateUser.ts
 */

import { ApiCall } from 'tsrpc'
import {
  ReqCreateUser,
  ResCreateUser
} from '../../shared/protocols/user/TplCreateUser'

export async function ApiCreateUser(
  call: ApiCall<ReqCreateUser, ResCreateUser>
) {
  console.log(call.req)
}
