/*
 * @Author: vyron
 * @Date: 2022-05-01 18:44:13
 * @LastEditTime: 2022-05-02 21:45:09
 * @LastEditors: vyron
 * @Description: TSRPC共享类型扩展
 * @FilePath: /tsrpc-app/backend/src/shared/index.ts
 */
import { TsRpcPlugin } from '../plugins'

declare module 'tsrpc' {
  // 扩展插件类型
  export interface HttpServerWithPlugin extends HttpServer {
    plugin: TsRpcPlugin
  }
}
