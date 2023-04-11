export enum ClientStatus {
  AVAILABLE = 'AVAILABLE',
  OFFLINE = 'OFFLINE',
}

export interface ClientInfoDto {
  userId: String
  status: ClientStatus
  nickname: String
}
