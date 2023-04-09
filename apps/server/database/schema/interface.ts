import { Schema } from 'mongoose'

export enum ClientStatus {
  AVAILABLE = 'AVAILABLE',
  OFFLINE = 'OFFLINE',
}

export interface IClient {
  _id: Schema.Types.ObjectId
  username: string
  password: string
  nickname: string
  socketId: string
  groupId: Schema.Types.ObjectId[]
  status: ClientStatus
  isInvisibility: boolean

  getSignedJwtToken: () => string
  matchPassword: (enteredPassword: string) => Promise<boolean>
}

export interface IGroup {
  _id: Schema.Types.ObjectId
  groupName: string
  clientId: Schema.Types.ObjectId[]
}

export interface IChatData {
  _id: Schema.Types.ObjectId
  text: string
  createdAt: Date
  senderId: Schema.Types.ObjectId
  receiverId: Schema.Types.ObjectId
  groupId: Schema.Types.ObjectId
}
