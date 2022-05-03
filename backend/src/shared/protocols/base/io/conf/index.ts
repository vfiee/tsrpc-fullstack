/*
 * @Author: vyron
 * @Date: 2022-05-02 22:14:01
 * @LastEditTime: 2022-05-03 21:27:31
 * @LastEditors: vyron
 * @Description: IO 额外配置项
 * @FilePath: /tsrpc-app/backend/src/shared/protocols/base/io/conf/index.ts
 */

export * from './validate'
import { ParamsValidateRule } from './validate'

// 请求携带的额外参数基础配置
export interface BaseConf {
  /**
   * @description 是否需要登录
   * @defaultValue false
   */
  needLogin?: boolean
  /**
   * @description 是否需要指定权限查看
   * @defaultValue undefined
   */
  needRoles?: string[]
  /**
   * @description 校验参数是否通过
   * @defaultValue undefined
   */
  paramsValidateRule?: ParamsValidateRule | ParamsValidateRule[]
}
