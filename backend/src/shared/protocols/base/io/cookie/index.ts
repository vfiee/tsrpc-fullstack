/*
 * @Author: vyron
 * @Date: 2022-05-05 22:11:43
 * @LastEditTime: 2022-05-05 22:11:45
 * @LastEditors: vyron
 * @Description: Cookie 服务
 * @FilePath: /tsrpc-app/backend/src/shared/protocols/base/io/response/cookie/index.ts
 */

export declare interface Cookie {
  session: string
  [key: string]: any
}
