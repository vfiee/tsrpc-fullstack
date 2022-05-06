/*
 * @Author: vyron
 * @Date: 2022-04-28 12:34:06
 * @LastEditTime: 2022-05-05 22:15:55
 * @LastEditors: vyron
 * @Description: 响应基础类型
 * @FilePath: /tsrpc-app/backend/src/shared/protocols/base/io/response/index.ts
 */

import { Cookie } from '../cookie'

export declare interface DataResponse {}

export declare interface ListResponse {
  pageIndex: number
  pageSize: number
  total: number
  list: any[]
}

export declare type EmptyResponse = null

export declare interface BaseResponse<T = EmptyResponse> {
  code: ResponseStatus
  message?: ResponseMessage | string
  data: T | ListResponse | DataResponse
  [key: string]: any
}

export declare interface BaseResponseWithCookie<T = EmptyResponse>
  extends Cookie {
  code: ResponseStatus
  message?: ResponseMessage | string
  data: T | ListResponse | DataResponse
  [key: string]: any
}

export enum ResponseStatus {
  Success = 200,
  Failed = 500,
  NoLogin = 401, // 未登录
  NotFound = 404,
  NoAuth = 403 // 无权限
}

export enum ResponseMessage {
  Success = '请求成功',
  Failed = '请求失败,请稍后重试',
  NoLogin = '请先登录',
  NotFound = '请求资源不存在',
  NoAuth = '无权限访问'
}

export const SuccessResponse: BaseResponse = {
  code: ResponseStatus.Success,
  message: ResponseMessage.Success,
  data: null
}

export const FailedResponse: BaseResponse = {
  code: ResponseStatus.Failed,
  message: ResponseMessage.Failed,
  data: null
}

export const NoLoginResponse: BaseResponse = {
  code: ResponseStatus.NoLogin,
  message: ResponseMessage.NoLogin,
  data: null
}

export const NotFoundResponse: BaseResponse = {
  code: ResponseStatus.NotFound,
  message: ResponseMessage.NotFound,
  data: null
}

export const NoAuthResponse: BaseResponse = {
  code: ResponseStatus.NoAuth,
  message: ResponseMessage.NoAuth,
  data: null
}

export const NoDataResponse: BaseResponse = {
  code: ResponseStatus.Success,
  message: ResponseMessage.Success,
  data: null
}
