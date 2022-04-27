/*
 * @Author: vyron
 * @Date: 2022-04-27 17:25:57
 * @LastEditTime: 2022-04-27 17:35:00
 * @LastEditors: vyron
 * @Description: 更新用户信息
 * @FilePath: /tsrpc-app/backend/src/api/user/ApiUpdateUser.ts
 */

import { ApiCall } from 'tsrpc'
import {
  ReqUpdateUser,
  ResUpdateUser
} from '../../shared/protocols/user/TplUpdateUser'

export async function ApiUpdateUser(
  call: ApiCall<ReqUpdateUser, ResUpdateUser>
) {
  console.log(call.req)
}
