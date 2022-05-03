/*
 * @Author: vyron
 * @Date: 2022-04-28 13:42:53
 * @LastEditTime: 2022-05-03 21:21:12
 * @LastEditors: vyron
 * @Description: MongoDb 基础服务
 * @FilePath: /tsrpc-app/backend/src/services/mongo/index.ts
 */
import { Logger } from 'tsrpc'
import { Collection, Db, MongoClient, OptionalId } from 'mongodb'
import { DbCollectionType } from '@Protocols/base'

export class MongoDb {
  static db: Db
  static dbName = 'tsrpc'
  // 初始化数据库
  static async init(logger?: Logger) {
    logger?.log('Connecting to MongoDB...')
    const uri = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.pdgqg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    const client = new MongoClient(uri).connect()
    logger?.log('MongoDB connected successfully!')
    this.db = (await client).db(this.dbName)
  }
  // 获取数据库表
  static collection<T extends keyof DbCollectionType>(
    col: T
  ): Collection<OptionalId<DbCollectionType[T]>> {
    return this.db.collection(col)
  }
}
