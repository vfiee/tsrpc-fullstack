/*
 * @Author: vyron
 * @Date: 2022-05-01 18:40:06
 * @LastEditTime: 2022-05-03 21:19:38
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
  isNumber,
  toRawType,
  isRegExp
} from '@j-utils/type'
import { HttpServerWithPlugin, TsRpcPluginFn } from '..'
import {
  BaseConf,
  Validator,
  ValidateRule,
  ParamsValidateRule
} from '@Protocols/base/io/conf'

export type ValidateParamsSuccess = null

export type ValidateParamsFailed = {
  code: number
  message: string
}

export type ValidateParamsResult = Promise<
  [boolean, ValidateParamsSuccess | ValidateParamsFailed]
>

export type Validators = {
  [key in keyof Omit<ValidateRule, 'message'> as string]: Validator
}

const validate = async (
  value: any,
  rule: ValidateRule
): ValidateParamsResult => {
  const { type, min, max, pattern, validator, message } = rule
  const validators: Validators = {
    validator: (value) => isFunction(validator) && validator!(value),
    type: (value: unknown) => toRawType(value) === type,
    min: (value: unknown) => isNumber(value) && value >= (min as number),
    max: (value: unknown) => isNumber(value) && value <= (max as number),
    pattern: (value: any) => isRegExp(pattern) && pattern.test(value.toString())
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

const validateSingleParams = async <T extends any>(
  req: T,
  rule: ParamsValidateRule
): ValidateParamsResult => {
  const { key, rules } = rule
  const value = (req as any)[key]
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

const validateMultipleParams = async <T extends any>(
  req: T,
  rules: ParamsValidateRule[]
): ValidateParamsResult => {
  for (let i = 0; i < rules.length; i++) {
    let [isPass, data] = await validateSingleParams(req, rules[i])
    if (!isPass) return [isPass, data]
  }
  return [true, null]
}

const validateParams = (call: ApiCall<any, any, any>): ValidateParamsResult => {
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

export const paramsValidatePlugin: TsRpcPluginFn = (
  server: HttpServerWithPlugin
) => {
  server.flows.preApiCallFlow.push(async (call: ApiCall<any, any, any>) => {
    const { paramsValidateRule } = call.service.conf ?? {}
    if (isEmpty(paramsValidateRule)) return call
    const [isPass, data] = await validateParams(call)
    if (isPass) return call
    const { code, message } = data as ValidateParamsFailed
    call.error({
      code,
      message,
      type: TsrpcErrorType.ApiError
    })
    return null
  })
}
