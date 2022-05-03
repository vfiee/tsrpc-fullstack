/*
 * @Author: vyron
 * @Date: 2022-05-01 18:40:01
 * @LastEditTime: 2022-05-03 22:37:25
 * @LastEditors: vyron
 * @Description: TSRPC插件
 * @FilePath: /tsrpc-app/backend/src/plugins/core/index.ts
 */
import { isArray } from '@j-utils/type'
import { ServiceType } from '@Protocols'
import { HttpServer, ServiceProto, HttpServerOptions } from 'tsrpc'

export type TsRpcPlugin = (server: HttpServerWithPlugin) => void

export class TsRpcPlugins {
  private plugins: Set<TsRpcPlugin>
  private server: HttpServerWithPlugin
  constructor(server: HttpServerWithPlugin) {
    this.server = server
    this.plugins = new Set()
  }
  use(plugins: TsRpcPlugin | TsRpcPlugin[]): TsRpcPlugins {
    if (isArray(plugins)) {
      plugins.forEach(this.register)
    } else {
      this.register(plugins)
    }
    return this
  }
  private register(plugin: TsRpcPlugin): TsRpcPlugins {
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
  plugins: TsRpcPlugins
  constructor(
    proto: ServiceProto<ServiceType>,
    options?: Partial<HttpServerOptions<ServiceType>>
  ) {
    super(proto, options)
    this.plugins = new TsRpcPlugins(this)
  }
}
