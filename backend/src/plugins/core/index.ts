/*
 * @Author: vyron
 * @Date: 2022-05-01 18:40:01
 * @LastEditTime: 2022-05-03 21:42:03
 * @LastEditors: vyron
 * @Description: TSRPC插件
 * @FilePath: /tsrpc-app/backend/src/plugins/core/index.ts
 */
import { isArray } from '@j-utils/type'
import { ServiceType } from '@Protocols'
import { HttpServer, ServiceProto, HttpServerOptions } from 'tsrpc'

export type TsRpcPluginFn = (server: HttpServerWithPlugin) => void

export class TsRpcPlugin {
  private plugins: Set<TsRpcPluginFn>
  private server: HttpServerWithPlugin
  constructor(server: HttpServerWithPlugin) {
    this.server = server
    this.plugins = new Set()
  }
  use(plugins: TsRpcPluginFn | TsRpcPluginFn[]): TsRpcPlugin {
    if (isArray(plugins)) {
      plugins.forEach(this.register)
    } else {
      this.register(plugins)
    }
    return this
  }
  private register(plugin: TsRpcPluginFn): TsRpcPlugin {
    if (this.plugins.has(plugin)) {
      console.warn(`[TsRpcPlugin Warn] Plugin already registered!`)
      return this
    }
    this.plugins.add(plugin)
    plugin(this.server)
    return this
  }
}

export class HttpServerWithPlugin extends HttpServer {
  plugins: TsRpcPlugin
  constructor(
    proto: ServiceProto<ServiceType>,
    options?: Partial<HttpServerOptions<ServiceType>>
  ) {
    super(proto, options)
    this.plugins = new TsRpcPlugin(this)
  }
}
