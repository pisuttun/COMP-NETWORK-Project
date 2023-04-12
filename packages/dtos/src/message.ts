export interface SendMessageDto {
  text: string
  senderId: string
  receiverId?: string
  groupId?: string
}

export interface NewMessageDto {
  messageId: string
  text: string
  senderId: string
  senderNickname: string
  createdAt: Date
}

export interface ReqGetMessageDto {
  latestMessageId?: string
  senderId?: string
  receiverId?: string
  groupId?: string
}

export interface MessageDto {
  messageId: string
  text: string
  senderId: string
  senderNickname: string
  createdAt: Date
}

export interface ResGetMessageDto {
  messages: MessageDto[]
  nextMessageId: string
}
