/*
 * @Author: vyron
 * @Date: 2022-05-01 18:40:06
 * @LastEditTime: 2022-05-05 17:16:15
 * @LastEditors: vyron
 * @Description: TSRPC验证请求参数插件
 * @FilePath: /tsrpc-app/backend/src/plugins/paramsValidate/index.ts
 */
import { ApiCall, TsrpcErrorType } from 'tsrpc'
import {
  isArray,
  isEmpty,
  isFunction,
  isNil,
  toRawType,
  isRegExp,
  isString
} from '@j-utils/type'
import { HttpServerWithPlugin, TsRpcPlugin } from '..'
import {
  BaseConf,
  Validator,
  ValidateRule,
  ParamsValidateRule
} from '@Protocols/base/io/conf'

export type ValidateSuccess = null

export type ValidateFailed = {
  code: number
  message: string
}

export type ValidateResult = Promise<
  [boolean, ValidateSuccess | ValidateFailed]
>

export type Validators = {
  [key in keyof Omit<ValidateRule, 'message'> as string]: Validator
}

const validate = async (value: any, rule: ValidateRule): ValidateResult => {
  const { type, min, max, pattern, validator, message } = rule
  const validators: Validators = {
    validator: (value) => isFunction(validator) && validator!(value),
    type: (value: unknown) => toRawType(value) === type,
    min: (value: unknown) => isString(value) && value.length >= (min as number),
    max: (value: unknown) => isString(value) && value.length <= (max as number),
    pattern: (value: any) => {
      const reg = isRegExp(pattern) ? pattern : new RegExp(pattern as unknown as string)
      return reg.test(value.toString())
    }
  }
  const validateTypes = Object.keys(validators).filter(
    (type) => !isNil(rule[type as keyof Omit<ValidateRule, 'message'>])
  )
  for (let i = 0; i < validateTypes.length; i++) {
    const isPass = await validators[validateTypes[i]](value)
    if (!isPass) {
      return [false, { code: 400, message }]
    }
  }
  return [true, null]
}

const validateSingleParams = async (
  req: any,
  rule: ParamsValidateRule
): ValidateResult => {
  const { key, rules } = rule
  const value = req[key]
  if (isNil(value)) return [false, { code: 400, message: `${key} is required` }]
  if (isArray(rules)) {
    if (rules.length === 1) return validate(value, rules[0])
    for (let i = 0; i < rules.length; i++) {
      const result = await validate(value, rules[i])
      if (!result[0]) {
        return result
      }
    }
    return [true, null]
  }
  return validate(value, rules)
}

const validateMultipleParams = async (
  req: any,
  rules: ParamsValidateRule[]
): ValidateResult => {
  for (let i = 0; i < rules.length; i++) {
    let [isPass, data] = await validateSingleParams(req, rules[i])
    if (!isPass) return [isPass, data]
  }
  return [true, null]
}

const validateParams = (call: ApiCall): ValidateResult => {
  const { req, service: { conf } = {} } = call
  let { paramsValidateRule } = (conf ?? {}) as BaseConf
  if (isEmpty(req) || isEmpty(paramsValidateRule))
    return Promise.resolve([true, null])
  if (isArray(paramsValidateRule)) {
    return paramsValidateRule.length === 1
      ? validateSingleParams(req, paramsValidateRule[0])
      : validateMultipleParams(req, paramsValidateRule as ParamsValidateRule[])
  }
  return validateSingleParams(req, paramsValidateRule as ParamsValidateRule)
}

export const paramsValidatePlugin: TsRpcPlugin = (
  server: HttpServerWithPlugin
) => {
  server.flows.preApiCallFlow.push(async (call: ApiCall) => {
    const { paramsValidateRule } = (call.service.conf ?? {}) as BaseConf
    if (isEmpty(paramsValidateRule)) return call
    const [isPass, data] = await validateParams(call)
    if (isPass) return call
    const { code, message } = data as ValidateFailed
    call.error({
      code,
      message,
      type: TsrpcErrorType.ApiError
    })
    return null
  })
}
