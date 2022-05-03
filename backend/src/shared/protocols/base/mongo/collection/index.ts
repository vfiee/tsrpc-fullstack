/*
 * @Author: vyron
 * @Date: 2022-04-28 13:40:34
 * @LastEditTime: 2022-04-29 19:11:20
 * @LastEditors: vyron
 * @Description: MongoDbCollection 类型定义
 * @FilePath: /tsrpc-app/backend/src/shared/protocols/base/mongo/collection/index.ts
 */
import { DbUser } from '../user'

export interface DbCollectionType {
  User: DbUser
}
