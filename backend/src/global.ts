/*
 * @Author: vyron
 * @Date: 2022-04-27 13:31:32
 * @LastEditTime: 2022-04-27 13:32:56
 * @LastEditors: vyron
 * @Description: 全局共享数据
 * @FilePath: /tsrpc-app/backend/src/global.ts
 */
import { Db, MongoClient } from 'mongodb'

export class Global {
  static db: Db
  static async initDb() {
    const uri = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.pdgqg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    const client = new MongoClient(uri).connect()
    this.db = (await client).db()
  }
}
