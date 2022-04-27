/*
 * @Author: vyron
 * @Date: 2022-04-27 17:25:57
 * @LastEditTime: 2022-04-27 17:34:09
 * @LastEditors: vyron
 * @Description: 删除用户
 * @FilePath: /tsrpc-app/backend/src/api/user/APIDeleteUser.ts
 */
import { ApiCall } from 'tsrpc'
import {
  ReqDeleteUser,
  ResDeleteUser
} from '../../shared/protocols/user/TplDeleteUser'

export async function ApiDeleteUser(
  call: ApiCall<ReqDeleteUser, ResDeleteUser>
) {
  console.log(call.req)
}
