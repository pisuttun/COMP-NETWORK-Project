export enum ClientStatus {
  AVAILABLE = 'AVAILABLE',
  OFFLINE = 'OFFLINE',
}

export interface ClientInfoDto {
  userId: string
  status: ClientStatus
  nickname: string
}

export interface UpdateClientInfoDto {
  senderId?: string
  isInvisible?: boolean
  nickname?: string
}
