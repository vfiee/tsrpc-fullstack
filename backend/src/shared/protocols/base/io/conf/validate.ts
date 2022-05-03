/*
 * @Author: vyron
 * @Date: 2022-05-03 21:27:23
 * @LastEditTime: 2022-05-03 21:27:34
 * @LastEditors: vyron
 * @Description: 请求参数验证规则
 * @FilePath: /tsrpc-app/backend/src/shared/protocols/base/io/conf/validate.ts
 */

export type Validator = <T = any>(value: T) => boolean | Promise<boolean>

export interface ValidateRule {
  type?: string
  min?: number
  max?: number
  pattern?: RegExp
  validator?: Validator
  message: string
}

export interface ParamsValidateRule {
  key: string
  rules: ValidateRule | ValidateRule[]
}
