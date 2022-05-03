/*
 * @Author: vyron
 * @Date: 2022-04-28 13:24:41
 * @LastEditTime: 2022-04-29 16:00:47
 * @LastEditors: vyron
 * @Description: 用户表结构
 * @FilePath: /tsrpc-app/backend/src/shared/protocols/base/mongo/user/index.ts
 */
import { ObjectId } from 'mongodb'

export interface DbUser {
  // 唯一 ID
  _id: ObjectId
  // 姓名
  name: string
  // 昵称
  nickname: string
  // 头像URL
  avatar: string
  // 密码
  password: string
  // 手机号(判断用户是否唯一的标准)
  phone: string
  // 邮箱
  email?: string
  // 性别
  sex: number
  // 出生年月日(时间戳)
  born?: number
  // 微信 ID
  wechatId?: ObjectId
}
