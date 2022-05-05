/*
 * @Author: vyron
 * @Date: 2022-05-03 21:27:23
 * @LastEditTime: 2022-05-05 17:24:49
 * @LastEditors: vyron
 * @Description: 请求参数验证规则
 * @FilePath: /tsrpc-app/backend/src/shared/protocols/base/io/conf/validate.ts
 */

export type Validator = <T = any>(value: T) => boolean | Promise<boolean>

export interface ValidateRule {
  // Object.prototype.toString.call(value).slice(8, -1) 的返回值
  type?: string
  // 最小长度
  min?: number
  // 最大长度
  max?: number
  // 正则表达式验证
  pattern?: string
  // 自定义校验方式
  validator?: Validator
  // 错误提示信息
  message: string
}

export interface ParamsValidateRule {
  key: string
  rules: ValidateRule | ValidateRule[]
}
