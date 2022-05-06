/*
 * @Author: vyron
 * @Date: 2022-04-28 12:34:01
 * @LastEditTime: 2022-05-05 22:15:31
 * @LastEditors: vyron
 * @Description: 请求基础类型
 * @FilePath: /tsrpc-app/backend/src/shared/protocols/base/io/request/index.ts
 */
import { Cookie } from '../cookie'

export interface BaseRequest {}

export interface BaseRequestWithCookie extends Cookie {}
