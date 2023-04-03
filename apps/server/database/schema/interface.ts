export enum ClientStatus {
  AVAILABLE = 'AVAILABLE',
  OFFLINE = 'OFFLINE',
}

export interface IClient {
  id: number
  username: string
  password: string
  nickname: string
  socketId: string
  groupId: number[]
  status: ClientStatus
  isInvisibility: boolean
}

export interface IGroup {
  id: number
  groupName: string
  clientId: number[]
}

export interface IChatData {
  id: number
  text: string
  createdAt: Date
  senderId: number
  receiverId: number
  groupId: number
}
