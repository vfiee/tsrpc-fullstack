/*
 * @Author: vyron
 * @Date: 2022-04-28 12:34:06
 * @LastEditTime: 2022-05-03 21:29:57
 * @LastEditors: vyron
 * @Description: 响应基础类型
 * @FilePath: /tsrpc-app/backend/src/shared/protocols/base/io/response/index.ts
 */

import { TsrpcErrorData } from 'tsrpc'

export interface BaseResponse {}

export declare enum ResponseStatus {
  Success = 200,
  Failed = 500,
  NoLogin = 401, // 未登录
  NotFound = 404,
  NoAuth = 403 // 无权限
}

export interface ResponseError extends TsrpcErrorData {
  // code 必填
  code: ResponseStatus
}
